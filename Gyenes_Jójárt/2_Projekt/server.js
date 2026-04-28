// Importálás
import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import * as deepl from 'deepl-node';
import fs from 'fs';
import os from 'os';
import path from 'path';
import FormData from 'form-data';
import mime from 'mime-types';
import bcryptjs from 'bcryptjs';

// Alapvető konfigolások
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Változók meghatározása
let users;

// Adatbázis csatlakoztatása és beállítása
let translations = null;
async function initDb() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  users = client.db(process.env.DB_NAME || "appdb").collection("users");
  await users.updateMany(
    { usernameLower: { $exists: false } },
    [{ $set: { usernameLower: { $toLower: "$username" } } }]
  );
  await users.createIndex({ usernameLower: 1 }, { unique: true });
  await users.updateMany(
    { isAdmin: { $exists: false } },
    { $set: { isAdmin: false } }
  );
  await users.updateMany(
    { isModerator: { $exists: false } },
    { $set: { isModerator: false } }
  );
  await users.updateMany(
    { moderator: { $exists: true } },
    { $unset: { moderator: "" } }
  );

  translations = client.db(process.env.DB_NAME || "appdb").collection("translations");
}

if (process.env.NODE_ENV !== 'test') {
  initDb().catch(err => {
    console.error('DB init failed', err);
    process.exit(1);
  });
}

// Plan definitions and corresponding limits
const PLAN_DEFS = {
  free: {
    id: 'free',
    name: 'Nudli',
    maxTranslations: 10,
    maxImages: 1,
    maxDocuments: 1,
  },
  plus: {
    id: 'plus',
    name: 'Nudli Plusz',
    maxTranslations: null, // null = unlimited
    maxImages: null,
    maxDocuments: null,
  }
};

// ===== HELPER =====
// Admin-e?
const adminHeader = (req) => req.header("x-admin") === "1";
// Moderátor-e?
const moderatorHeader = (req) => req.header("x-moderator") === "1";

// helpers for plan and daily counters
const todayDate = () => new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const getPlanDef = (userDoc) => {
  const id = userDoc?.planId || (userDoc?.subscribed ? 'free' : null);
  return id ? PLAN_DEFS[id] : null;
};

// Escape user input for safe use inside a RegExp
const escapeRegExp = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Exported logic helpers so tests can call auth logic without importing/running the whole server
export async function registerLogic({ username, password } = {}, usersCollection) {
  if (!username || !password)
    return { status: 400, body: { ok: false, msg: "Hiányzó mező" } };

  try {
    const usernameLower = String(username).toLowerCase();
    const hashedPassword = await bcryptjs.hash(password, 10);
    await usersCollection.insertOne({ username, usernameLower, password: hashedPassword, isAdmin: false, isModerator: false });
    return { status: 200, body: { ok: true, msg: "Sikeres regisztráció" } };
  } catch (e) {
    const code = e && e.code === 11000 ? 409 : 500;
    const msg = e && e.code === 11000 ? "Felhasználónév foglalt" : "Szerver hiba";
    return { status: code, body: { ok: false, msg } };
  }
}

export async function loginLogic({ username, password } = {}, usersCollection) {
  if (!username || !password)
    return { status: 400, body: { ok: false, msg: "Hiányzó mező" } };

  try {
    const usernameLower = String(username).toLowerCase();
    const u = await usersCollection.findOne({ usernameLower });
    if (!u) return { status: 401, body: { ok: false, msg: "Hibás adatok" } };

    const isPasswordValid = await bcryptjs.compare(password, u.password);
    if (!isPasswordValid) return { status: 401, body: { ok: false, msg: "Hibás adatok" } };

    const planId = u.planId || (u.subscribed ? 'free' : null);
    const planDef = planId ? PLAN_DEFS[planId] : null;

    const body = {
      ok: true,
      msg: "Sikeres bejelentkezés",
      username: u.usernameLower || String(username).toLowerCase(),
      isAdmin: !!u.isAdmin,
      isModerator: !!u.isModerator,
      subscribed: !!u.subscribed,
      plan: planDef ? { id: planDef.id, name: planDef.name } : null,
      limits: planDef ? { maxTranslations: planDef.maxTranslations, maxImages: planDef.maxImages, maxDocuments: planDef.maxDocuments } : null
    };

    return { status: 200, body };
  } catch (err) {
    console.error(err);
    return { status: 500, body: { ok: false, msg: "Szerver hiba" } };
  }
}

export function setUsersCollection(col) { users = col; }

// ===== AUTH =====
// Regisztrálás (POST request)
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) 
    return res.status(400).json({ ok: false, msg: "Hiányzó mező" });
  
  try {
    const usernameLower = String(username).toLowerCase();
    // Jelszó hashelése bcrypt-tel
    const hashedPassword = await bcryptjs.hash(password, 10);
    await users.insertOne({ username, usernameLower, password: hashedPassword, isAdmin: false, isModerator: false });
    res.json({ ok: true, msg: "Sikeres regisztráció" });
  } catch (e) {
    const code = e.code === 11000 ? 409 : 500;
    const msg = e.code === 11000 ? "Felhasználónév foglalt" : "Szerver hiba";
    res.status(code).json({ ok: false, msg });
  }
});

// Bejelentkezés (POST request)

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) 
    return res.status(400).json({ ok: false, msg: "Hiányzó mező" });
  
  try {
    const usernameLower = String(username).toLowerCase();
    const u = await users.findOne({ usernameLower });
    if (!u) return res.status(401).json({ ok: false, msg: "Hibás adatok" });

    // Jelszó ellenőrzése bcrypt-tel
    const isPasswordValid = await bcryptjs.compare(password, u.password);
    if (!isPasswordValid) return res.status(401).json({ ok: false, msg: "Hibás adatok" });

    const planId = u.planId || (u.subscribed ? 'free' : null);
    const planDef = planId ? PLAN_DEFS[planId] : null;
    
    res.json({ ok: true, msg: "Sikeres bejelentkezés", username: u.usernameLower || String(username).toLowerCase(), isAdmin: !!u.isAdmin, isModerator: !!u.isModerator, subscribed: !!u.subscribed, plan: planDef ? { id: planDef.id, name: planDef.name } : null, limits: planDef ? { maxTranslations: planDef.maxTranslations, maxImages: planDef.maxImages, maxDocuments: planDef.maxDocuments } : null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: "Szerver hiba" });
  }
});

// ===== ADMIN ENDPOINTOK =====

// Felhasználók lekérése (GET request)
app.get("/api/users", async (req, res) => {
  // allow admins and moderators to list users
  if (!(adminHeader(req) || moderatorHeader(req))) 
    return res.status(403).json({ ok: false, msg: "Nincs jogosultság" });

  const q = (req.query.q || "").trim();
  const filter = q ? { username: { $regex: q, $options: "i" } } : {};
  
  const docs = await users
    .find(filter, { projection: { password: 0 } })
    .sort({ username: 1 })
    .limit(100)
    .toArray();

  res.json({ ok: true, users: docs });
});

// Moderátor jogosultság változtatása (PATCH request)
app.patch("/api/users/:username/moderator", async (req, res) => {
  if (!adminHeader(req)) 
    return res.status(403).json({ ok: false, msg: "Nincs jogosultság" });

  const { username } = req.params;
  const { isModerator } = req.body || {};
  if (typeof isModerator !== "boolean") 
    return res.status(400).json({ ok: false, msg: "isModerator boolean kell" });
  if (username.toLowerCase() === "admin" && isModerator) 
    return res.status(400).json({ ok: false, msg: "Alap admin automatikusan moderátor" });

  const r = await users.updateOne({ usernameLower: username.toLowerCase() }, { $set: { isModerator } });
  if (!r.matchedCount) return res.status(404).json({ ok: false, msg: "Nincs ilyen user" });

  res.json({ ok: true, msg: isModerator ? "Moderátor jog beállítva" : "Moderátor jog eltávolítva", isModerator });
});

// Jelszó változtatása (PATCH request)
app.patch("/api/users/:username/password", async (req, res) => {
  const { username } = req.params;
  const { password, currentPassword, requester } = req.body || {};

  if (!adminHeader(req) && requester !== username) return res.status(403).json({ ok: false, msg: 'Nincs jogosultság' });
  if (!password) return res.status(400).json({ ok: false, msg: 'Hiányzó új jelszó' });

  try {
    // If requester is the user themself (not admin), require current password verification
    if (!adminHeader(req) && requester === username) {
      if (!currentPassword) return res.status(400).json({ ok: false, msg: 'Hiányzó jelenlegi jelszó' });
      const u = await users.findOne({ usernameLower: username.toLowerCase() });
      if (!u) return res.status(404).json({ ok: false, msg: 'Nincs ilyen felhasználó' });
      const valid = await bcryptjs.compare(currentPassword, u.password);
      if (!valid) return res.status(401).json({ ok: false, msg: 'Hibás jelenlegi jelszó' });
    }

    // Új jelszó hashelése bcrypt-tel
    const hashedPassword = await bcryptjs.hash(password, 10);
    const r = await users.updateOne({ usernameLower: username.toLowerCase() }, { $set: { password: hashedPassword } });
    if (!r.matchedCount) return res.status(404).json({ ok: false, msg: 'Nincs ilyen felhasználó' });

    res.json({ ok: true, msg: 'Jelszó frissítve' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: 'Szerver hiba' });
  }
});

// Admin jogosultság változtatása (PATCH request)
app.patch("/api/users/:username/admin", async (req, res) => {
  if (!adminHeader(req)) 
    return res.status(403).json({ ok: false, msg: "Nincs jogosultság" });

  const { username } = req.params;
  const { isAdmin } = req.body || {};
  if (typeof isAdmin !== "boolean") 
    return res.status(400).json({ ok: false, msg: "isAdmin boolean kell" });
  if (username.toLowerCase() === "admin" && !isAdmin) 
    return res.status(400).json({ ok: false, msg: "Alap admin nem vonható meg" });

  const r = await users.updateOne({ usernameLower: username.toLowerCase() }, { $set: { isAdmin } });
  if (!r.matchedCount) return res.status(404).json({ ok: false, msg: "Nincs ilyen user" });

  res.json({ ok: true, msg: isAdmin ? "Admin jog beállítva" : "Admin jog eltávolítva", isAdmin });
});

// Előfizetés beállítása
app.patch('/api/users/:username/subscription', async (req, res) => {
  const { username } = req.params;
  const { subscribed, planId } = req.body || {};

  if (typeof subscribed !== 'boolean') return res.status(400).json({ ok: false, msg: 'subscribed boolean kell' });
  if (subscribed && planId && !PLAN_DEFS[planId]) return res.status(400).json({ ok: false, msg: 'Ismeretlen csomag' });

  const requester = req.body.requester || null;
  if (!adminHeader(req) && requester !== username) return res.status(403).json({ ok: false, msg: 'Nincs jogosultság' });

  const userDoc = await users.findOne({ usernameLower: username.toLowerCase() });
  if (!userDoc) return res.status(404).json({ ok: false, msg: 'Nincs ilyen user' });

  if (subscribed && planId && userDoc.planId === planId) {
    return res.json({ ok: false, msg: 'Már ezen a csomagon vagy', subscribed: true, planId });
  }

  const update = { subscribed };
  if (subscribed) {
    update.planId = planId || userDoc.planId || 'free';
  } else {
    update.planId = null;
  }

  const r = await users.updateOne({ usernameLower: username.toLowerCase() }, { $set: update });
  if (!r.matchedCount) return res.status(404).json({ ok: false, msg: 'Nincs ilyen user' });

  const finalPlan = update.planId ? PLAN_DEFS[update.planId] : null;
  res.json({ ok: true, msg: subscribed ? 'Előfizetés aktiválva' : 'Előfizetés lemondva', subscribed, plan: finalPlan ? { id: finalPlan.id, name: finalPlan.name } : null, limits: finalPlan ? { maxTranslations: finalPlan.maxTranslations, maxImages: finalPlan.maxImages, maxDocuments: finalPlan.maxDocuments } : null });
});

// Felhasználó törlése (DELETE request)
app.delete("/api/users/:username", async (req, res) => {
  const { username } = req.params;
  const bodyRequester = req.body && req.body.requester ? req.body.requester : null;
  const queryRequester = req.query && req.query.requester ? req.query.requester : null;
  const headerRequester = req.header('x-requester') || null;
  const requester = bodyRequester || queryRequester || headerRequester;

  const isRequesterOwner = typeof requester === 'string' && requester.toLowerCase() === username.toLowerCase();
  if (!adminHeader(req) && !isRequesterOwner) {
    return res.status(403).json({ ok: false, msg: "Nincs jogosultság" });
  }

  if (username.toLowerCase() === 'admin') return res.status(400).json({ ok: false, msg: 'Alap admin nem törölhető' });

  try {
    if (!adminHeader(req) && isRequesterOwner) {
      const { password } = req.body || {};
      if (!password) return res.status(400).json({ ok: false, msg: 'Hiányzó jelszó' });
      const u = await users.findOne({ usernameLower: username.toLowerCase() });
      if (!u) return res.status(404).json({ ok: false, msg: 'Nincs ilyen user' });
      const valid = await bcryptjs.compare(password, u.password);
      if (!valid) return res.status(401).json({ ok: false, msg: 'Hibás jelszó' });
    }

    await translations.deleteMany({ userName: { $regex: `^${escapeRegExp(username)}$`, $options: 'i' } });
    
    const r = await users.deleteOne({ usernameLower: username.toLowerCase() });
    if (!r.deletedCount) return res.status(404).json({ ok: false, msg: "Nincs ilyen user" });

    res.json({ ok: true, msg: "Felhasználó és fordításai törölve" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: "Törlés sikertelen" });
  }
});

app.get('/api/users/:username', async (req, res) => {
  const { username } = req.params;
  const requester = req.query.requester || null;
  if (!adminHeader(req) && requester !== username) return res.status(403).json({ ok: false, msg: 'Nincs jogosultság' });

  const u = await users.findOne({ usernameLower: username.toLowerCase() }, { projection: { password: 0 } });
  if (!u) return res.status(404).json({ ok: false, msg: 'Nincs ilyen user' });
  const planDef = u.planId ? PLAN_DEFS[u.planId] : null;
  res.json({ ok: true, username: u.username, isAdmin: !!u.isAdmin, isModerator: !!u.isModerator, subscribed: !!u.subscribed, plan: planDef ? { id: planDef.id, name: planDef.name } : null, limits: planDef ? { maxTranslations: planDef.maxTranslations, maxImages: planDef.maxImages, maxDocuments: planDef.maxDocuments } : null });
});

const DEEPL_API_KEY = process.env.DEEPL_API_KEY || process.env.VITE_DEEPL_API_KEY;
if (!DEEPL_API_KEY) console.warn('Warning: DEEPL_API_KEY not set in environment');
const deeplClient = new deepl.DeepLClient(DEEPL_API_KEY);

const convertToDeepLLang = (code, isTarget = false) => {
  if (!code) return null;
  
  const normalized = code.toLowerCase();
  
  if (isTarget) {
    if (normalized.includes('-')) {
      const parts = normalized.split('-');
      return parts[0] + '-' + parts[1].toUpperCase();
    }
    return normalized;
  } else {
    if (normalized.includes('-')) {
      return normalized.split('-')[0]; // e.g., 'en-US' -> 'en'
    }
    if (normalized === 'zh-hans' || normalized === 'zh-hant') return 'zh';
    return normalized;
  }
};


app.post('/translate', async (req, res) => {
    const { text, source_lang, target_lang, userName, type } = req.body;
    try {
        (async () => {
            if (type === 'image') {
              if (!userName) return res.status(401).json({ ok: false, msg: 'Bejelentkezés szükséges a kép fordításhoz' });
                const u = await users.findOne({ usernameLower: String(userName).toLowerCase() });
              if (!u) return res.status(404).json({ ok: false, msg: 'Nincs ilyen felhasználó' });
              const today = todayDate();
              if (!u.imagesCountDate || u.imagesCountDate !== today) {
                await users.updateOne({ usernameLower: String(userName).toLowerCase() }, { $set: { imagesCount: 0, imagesCountDate: today } });
                u.imagesCount = 0; u.imagesCountDate = today;
              }
              if (!u.subscribed && (u.imagesCount || 0) >= 1) {
                return res.status(403).json({ ok: false, msg: 'Napi kép fordítás limit elérve. Előfizetés szükséges.' });
              }
                await users.updateOne({ usernameLower: String(userName).toLowerCase() }, { $inc: { imagesCount: 1 }, $set: { imagesCountDate: today } });
            }

            const deepLSourceLang = source_lang ? convertToDeepLLang(source_lang, false) : null;
            const deepLTargetLang = convertToDeepLLang(target_lang, true);
            
            console.log('Translating:', { source_lang, source_lang_deepl: deepLSourceLang, target_lang, target_lang_deepl: deepLTargetLang });
            
            const result = await deeplClient.translateText(`${text}`, deepLSourceLang, deepLTargetLang);
            res.json({ translation: result.text });
        })();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/save-translation', async (req, res) => {
    const { text, source_lang, target_lang, translation, userName } = req.body;
    if (!text || !translation || !target_lang) {
        return res.status(400).json({ ok: false, msg: "Hiányzó mező(k)" });
    }

  if (!userName) {
    return res.status(401).json({ ok: false, msg: 'Bejelentkezés szükséges a mentéshez' });
  }
  try {
      const u = await users.findOne({ usernameLower: String(userName).toLowerCase() });
    if (!u) return res.status(404).json({ ok: false, msg: 'Nincs ilyen felhasználó' });
    const planDef = getPlanDef(u);
    if (!u.subscribed) {
      const allowed = planDef && typeof planDef.maxTranslations === 'number' ? planDef.maxTranslations : 10;
  const count = await translations.countDocuments({ userName: { $regex: `^${escapeRegExp(String(userName))}$`, $options: 'i' } });
      if (count >= allowed) return res.status(403).json({ ok: false, msg: 'Elérted a mentett fordítások limitjét. Előfizetés szükséges.' });
    }

    const doc = {
      text,
      translation,
      source_lang,
      target_lang,
      userName,
      createdAt: new Date()
    };
    await translations.insertOne(doc);
    res.json({ ok: true, msg: "Fordítás elmentve!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: "Mentés sikertelen" });
  }
});

app.get('/api/translations', async (req, res) => {
  try {
  const q = (req.query.user || '').trim();
  const filter = q ? { userName: { $regex: `^${escapeRegExp(q)}$`, $options: 'i' } } : {};
    const docs = await translations.find(filter).sort({ createdAt: -1 }).limit(200).toArray();
    res.json({ ok: true, translations: docs });
  } catch (err) {
    console.error('translations list error', err);
    res.status(500).json({ ok: false, msg: 'Hiba' });
  }
});

app.delete('/api/translations/:id', async (req, res) => {
  const { id } = req.params;
  const { username } = req.body || {};
  if (!id) return res.status(400).json({ ok: false, msg: 'Hiányzó id' });

  try {
    const doc = await translations.findOne({ _id: new ObjectId(id) });
    if (!doc) return res.status(404).json({ ok: false, msg: 'Nincs ilyen fordítás' });

  if (!adminHeader(req) && !moderatorHeader(req) && doc.userName !== username) {
      return res.status(403).json({ ok: false, msg: 'Nincs jogosultság törölni' });
    }

    await translations.deleteOne({ _id: doc._id });
    res.json({ ok: true, msg: 'Törölve' });
  } catch (err) {
    console.error('delete translation error', err);
    res.status(500).json({ ok: false, msg: 'Hiba törlés közben' });
  }
});

// Upload a file (client sends base64) and return server path
app.post('/upload-document', async (req, res) => {
  const { filename, contentBase64 } = req.body || {};
  if (!filename || !contentBase64) return res.status(400).json({ ok: false, msg: 'Missing file' });
  const tmpPath = path.join(os.tmpdir(), `${Date.now()}_${path.basename(filename)}`);
  try {
    await fs.promises.writeFile(tmpPath, Buffer.from(contentBase64, 'base64'));
    res.json({ ok: true, path: tmpPath });
  } catch (err) {
    console.error('upload-document error', err);
    res.status(500).json({ ok: false, msg: err.message });
  }
});

app.post('/translate-local', async (req, res) => {
  const { inputPath, outputFilename, source_lang, target_lang, userName } = req.body || {};
  if (!inputPath || !outputFilename || !target_lang) return res.status(400).json({ ok: false, msg: 'Missing params' });
  try {
    if (!userName) return res.status(401).json({ ok: false, msg: 'Bejelentkezés szükséges a dokumentum fordításhoz' });
    const u = await users.findOne({ usernameLower: String(userName).toLowerCase() });
    if (!u) return res.status(404).json({ ok: false, msg: 'Nincs ilyen felhasználó' });
    const today = todayDate();
    if (!u.docsCountDate || u.docsCountDate !== today) {
      await users.updateOne({ usernameLower: String(userName).toLowerCase() }, { $set: { docsCount: 0, docsCountDate: today } });
      u.docsCount = 0; u.docsCountDate = today;
    }
    if (!u.subscribed && (u.docsCount || 0) >= 1) {
      return res.status(403).json({ ok: false, msg: 'Napi dokumentum fordítás limit elérve. Előfizetés szükséges.' });
    }
  await users.updateOne({ usernameLower: String(userName).toLowerCase() }, { $inc: { docsCount: 1 }, $set: { docsCountDate: today } });
    const outputPath = path.join(os.tmpdir(), `${Date.now()}_${path.basename(outputFilename)}`);
    const deepLSourceLang = source_lang ? convertToDeepLLang(source_lang, false) : null;
    const deepLTargetLang = convertToDeepLLang(target_lang, true);
    const result = await deeplClient.translateDocument(inputPath, outputPath, deepLSourceLang, deepLTargetLang, {});
    res.download(outputPath, path.basename(outputPath), async (err) => {
      try { await fs.promises.unlink(inputPath); } catch (e) { /* ignore */ }
      try { await fs.promises.unlink(outputPath); } catch (e) { /* ignore */ }
      if (err) console.error('download error', err);
    });
  } catch (err) {
    console.error('translate-local error', err && err.stack ? err.stack : err);
    const resp = { ok: false, msg: err.message || 'Fordítás sikertelen' };
    if (err && err.documentHandle) resp.documentHandle = err.documentHandle;
    res.status(500).json(resp);
  }
});
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3001, () => console.log("Backend szerver futtatva"));
}