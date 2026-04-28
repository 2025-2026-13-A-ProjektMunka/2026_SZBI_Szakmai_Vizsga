  async function fetchJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error('Hálózati hiba: ' + res.status);
  return res.json();
}

async function loadData() {
  try {
    const users = await fetchJson('/api/users');
    const trainers = await fetchJson('/api/trainers');

    const usersEl = document.getElementById('users-list');
    const trainersEl = document.getElementById('trainers-list');

    if (usersEl) {
      usersEl.innerHTML = users.map(u => `<li>${u.name} — ${u.email}</li>`).join('');
    }
    if (trainersEl) {
      trainersEl.innerHTML = trainers.map(t => `<li>${t.name} — ${t.specialization || '—'}</li>`).join('');
    }

    console.log('users', users);
    console.log('trainers', trainers);
  } catch (err) {
    console.error('Hiba a betöltéskor', err);
  }
}

    document.addEventListener('DOMContentLoaded', loadData);
    
    
    
    async function szerkesztes(id) {
    const nev = document.getElementById('nev').value;
    const statusz = document.getElementById('statusz').value;

    if (statusz === '') {
        window.alert('A státusz nem lehet üres!');
        return;
    }

    const response = await fetch(`/users-backend/modosit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nev, statusz }),
    });

    const valasz = await response.json();

    if (response.ok) {  
        window.alert(valasz.msg);
        window.location = '/users-backend';
    } else {
        window.alert(valasz.msg);
    }
}

async function torles(id) {
    const response = await fetch(`/users-backend/torol/${id}`, {
        method: 'DELETE',
    });

    const valasz = await response.json();

    if (response.ok) {
        window.alert(valasz.msg);
        window.location = '/users-backend';
    } else {
        window.alert(valasz.msg);
    }
}
