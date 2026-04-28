// backend/controllers/userProfileController.js
const path = require('node:path');
// Feltételezzük, hogy a felhasználói modell innen érhető el:
const User = require(path.resolve(__dirname, '../../users/User.js')); 
// Vagy a megfelelő útvonal, pl.: const User = require('../../models/User.js');

// Profil oldal megjelenítése
exports.getProfile = async (req, res) => {
    try {
        // A 'protect' middleware elvileg már betölti a felhasználót, 
        // de biztonsági okból lekérhetjük újra, és rendereljük a 'profile.ejs' view-t.
        
        // Ellenőrizzük, hogy a felhasználó adataink rendelkezésre állnak-e (ha sikeres volt a protect futás)
        if (!req.user) {
             // Ha a middleware nem töltött be felhasználót, átirányítjuk bejelentkezésre.
             return res.redirect('/api/login-frontend'); 
        }

        // Tegyük fel, hogy a req.user már tartalmazza a teljes felhasználói objektumot (a jelszó kivételével)
        // Ha csak az ID-t tartalmazza, akkor a következő sort használd:
        // const user = await User.findById(req.user._id).select('-password');

        res.render('profile.ejs', {
            title: 'Saját Profil',
            user: req.user, // Átadjuk a felhasználói adatokat a view-nak
            // Ha a projektben van globális hiba/üzenetkezelés, azt is átadhatod
            message: req.session && req.session.message ? req.session.message : null 
        });

        // Töröljük az üzenetet a session-ből, hogy ne jelenjen meg újra
        if (req.session) req.session.message = null; 

    } catch (error) {
        console.error('Hiba a profil betöltésekor:', error);
        res.status(500).render('404.ejs', { error: 'Szerverhiba a profil betöltésekor!' });
    }
};

// Profil adatok frissítése
exports.updateProfile = async (req, res) => {
    try {
        // Ellenőrizzük, hogy a felhasználó be van-e jelentkezve
        if (!req.user || !req.user._id) {
             return res.redirect('/api/login-frontend'); 
        }

        const user = await User.findById(req.user._id);

        if (user) {
            // Frissíthető mezők beállítása a req.body-ból
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            
            // Jelszó frissítése (ha megadtak új jelszót)
            if (req.body.password) {
                // A User modellnek kell gondoskodnia a jelszó hasheléséről a .save() hívás előtt
                user.password = req.body.password; 
            }

            await user.save();
            
            // Sikeres frissítés esetén üzenet beállítása (ehhez Session Middleware kellhet)
            if (req.session) {
                req.session.message = 'A profil adatok sikeresen frissítve!';
            }

            // Visszairányítás a profil oldalra
            res.redirect('/myprofile'); 

        } else {
            // Ezt elvileg a 'protect' middleware kizárja, de biztos, ami biztos.
            res.status(404).render('404.ejs', { error: 'A felhasználó nem található!' });
        }
    } catch (error) {
        console.error('Hiba a profil frissítésekor:', error);
        // Hiba esetén visszairányítás (session üzenettel a hiba jelzésére)
        if (req.session) {
            req.session.message = 'Hiba történt az adatok frissítése során.';
        }
        res.redirect('/myprofile');
    }
};