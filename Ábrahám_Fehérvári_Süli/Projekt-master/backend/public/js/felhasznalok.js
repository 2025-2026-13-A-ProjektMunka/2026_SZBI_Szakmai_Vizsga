async function torol(id) {
    try {
        const response = await fetch(
            `http://localhost:3500/api/users-backend/torol/${id}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            }
        );

        return await response.json();
    } catch (error) {
        console.log('Backend hiba:', error.message);
        throw error;
    }
}

async function modosit(id, admin) {
    console.log(admin);
    
    try {
        const response = await fetch(
            `http://localhost:3500/api/users-backend/modosit/${id}`,
            {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ admin }),
            }
        );

        return await response.json();
    } catch (error) {
        console.log('Backend hiba:', error.message);
        throw error;
    }
}

async function idopont_torles() {
    try {
        const response = await fetch(
            'http://localhost:3500/api/users-backend',
            {
                method: 'DELETE',
            }
        );

        return await response.json();
    } catch (error) {
        console.log('Backend hiba:', error.message);
        throw error;
    }
}

// module.exports = { torolUser, modositUser };
