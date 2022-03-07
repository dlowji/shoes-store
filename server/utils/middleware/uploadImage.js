const multiparty = require('multiparty');
const path = require('path');
const fs = require('fs');

const global = {
    id: 1,
}

function uploadImage(req, res) {
    const form = multiparty.Form();

    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).send(err.message);

        const imgName = `img${global.id++}.png`;
        const oldPath = files.photo[0].path;
        const newPath = path.join(path.dirname(__dirname), 'public/upload', imgName);
        
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            console.log('Successfully renamed - AKA moved!');
        })

        return `/upload/${imgName}`;
    })
}

module.exports = { uploadImage };
