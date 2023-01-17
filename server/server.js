const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
app.use(cors());

app.post('/data', jsonParser, (req, res) => {
    res.send(req.body);
    console.log(req.body);
});



app.listen(8000, () => console.log('API is running on http://localhost:8000/data'));