const express = require('express');
const cors = require('cors')
const app = express();
const multer = require('multer')
const transfer = require("./transfer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const originalFileName = file.originalname;
        cb(null, originalFileName)
    }
})

const upload = multer({storage: storage})


app.use(cors());

app.post('/data', upload.single('file'), (req, res, next) => {
    res.send(req.body)

    console.log('1', req.file)
    console.log('2', JSON.parse(req.body.info))
    const transferInfo = JSON.parse(req.body.info);
    transferInfo.filePath = req.file.destination + req.file.filename;

    transfer.transferData(transferInfo)
});


app.listen(8000, () => console.log('API is running on http://localhost:8000/data'));