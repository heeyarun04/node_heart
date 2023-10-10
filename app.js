const express = require('express')
const app = express();
const port = 3000;
const path = require('path');
const axios = require('axios');
const fs = require('fs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.get('/', (req, res) => {
  res.status(200).json({msg: 'Hello this shaa!'})
})

app.get('/identitas/',require('./controller/response').identitas);
app.get('/identitas/:id',require('./controller/response').penilaian);
app.post('/kirimdata',require('./controller/response').kirimData );


app.get("/weather", require("./controller/response").weather);
app.get("/jsonspreadsheet", require("./controller/response").jsonSpreadsheet);

app.post('/senddata',require('./controller/response').sendData );

app.get('/coba', function(req, res){

   res.sendFile(path.join(__dirname, '/coba.json'));
});




app.get('/tabel', require("./controller/response").wait);
app.get('/fromdb', require("./controller/response").fromdb);
app.get('/refgetdata', require("./controller/response").refGetData);
app.get('/refsenddata', require("./controller/response").refSendData);
app.get('/refgetlogdata', require("./controller/response").refGetLogData);
app.post('/lamppost', require("./controller/response").lampPost);
app.get('/lampget', require("./controller/response").lampGet);

app.get('/senddatatosps', require("./controller/response").sendDataToSps);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
