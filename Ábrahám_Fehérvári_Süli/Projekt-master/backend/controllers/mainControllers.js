exports.getMain = ((req, res) => {
    try {
        res.statusCode = 200;
        return res.render('index.ejs');
    } catch (error) {
        res.statusCode = 500;
        return res.json({ msg: 'Valami hiba!'});
    }
});