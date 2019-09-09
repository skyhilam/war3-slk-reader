const slkreader = require('./slkreader')
const random = require('./random')
const labels = require('./labels')
const express = require('express');
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const app = express();
const path = require('path')
const port = 1822;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
}))

app.post('/slk', async (req, res) => {

    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const {tempFilePath, name, mimetype, size, mv} = req.files.file
    const names = name.split('.')
    const file_path = random(10)
    const new_file_path = path.join(__dirname, `tmp/${names[0]}-${file_path}-${names[1]}`)
    const output_file_path = path.join(__dirname, `tmp/${names[0]}-${file_path}.xlsx`)

    if (names[1] != 'slk') {
        return res.status(400).send('No files were uploaded.');
    }

    mv(new_file_path, err => {
        if (err)
            return res.status(500).send(err);

        return slkreader(new_file_path, output_file_path)
            .then(resp => {
                return res.send({
                    data: resp.data.Sheet1,
                    labels: labels[name]
                })
            })
    })

})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/pages/index.html'))
})

app.listen(port, () => {
    console.log(`localhost:${port}`);
})
