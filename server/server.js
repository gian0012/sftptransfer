const express = require('express');
const cors = require('cors')
const app = express();
const multer = require('multer')
const {transferData} = require("./transfer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/uploads/');

    },
    filename: function (req, file, cb) {
        const originalFileName = file.originalname;
        cb(null, originalFileName)
    }
})

const upload = multer({storage: storage}).single('file')


app.use(cors());
app.use(express.json());

app.post('/data', (req, res, next) => {
    upload(req, res, function () {
        const transferInfo = JSON.parse(req.body.info);
        transferInfo.filePath = req.file.destination + req.file.filename;
        transferInfo.fileName = req.file.filename;
        transferData(transferInfo);
    })
});


app.listen(8000, () => console.log('API is running on http://localhost:8000/'));