import app from '../app.js';

// Nem létező route-ok kiszolgálása!
// pl. http://localhost:3500/api/kiskutya
app.use((req, res) => {
    try {
        res.statusCode = 404;
        return res.render('404.ejs');
    } catch (error) {
        res.statusCode = 500;
        return res.json({ msg: 'Általános szerver hiba!' });
    }
});