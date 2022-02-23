
class SiteController {
    
    // [GET] /
    index(req, res) {
        res.send('home');
    }
}

module.exports = new SiteController;
