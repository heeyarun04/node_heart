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


app.get('/senddatatosps', require("./controller/response").sendDataToSps);
app.get('/getdata', require("./controller/response").getData);
app.get('/reload', require("./controller/response").reload);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
