const axios = require('axios');
const fs = require('fs');
const pool = require('../koneksi_db/koneksi');



async function getData(req,res){

	pool.query('SELECT * FROM heart', (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  const data = result.rows;
  // Pass data to your HTML rendering function


res.render('views/fromdb',{
	data:data,
});

});


}



async function reload(req,res){

	pool.query('SELECT * FROM heart', (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  const data = result.rows;
  // Pass data to your HTML rendering function


	res.status(200).json(data);


});


}



async function sendDataToSps(req,res){




	const data = req.body;

  var spo2 = req.query.spo2;
  var hr = req.query.hr;
  var akselox = req.query.akselox;
  var akseloy = req.query.akseloy;
  var akseloz = req.query.akseloz;

const response = await axios.get("https://script.google.com/macros/s/AKfycbwhi0FRPnUyq_5dFZkBcD4na8z0sB1DFYtJ-05DIn_C8l4ezb2NV5CMB_gmeDl2Urv3cg/exec?hr="+hr+"&spo2="+spo2+"&akselox="+akselox+"&akseloy="+akseloy+"&akseloz="+akseloz);



const json = {
			"spo2": spo2,
			"hr": hr,
			"akselox": akselox,
			"akseloy": akseloy,
			"akseloz": akseloz,
		
	};


	//console.log("https://script.google.com/macros/s/AKfycbwhi0FRPnUyq_5dFZkBcD4na8z0sB1DFYtJ-05DIn_C8l4ezb2NV5CMB_gmeDl2Urv3cg/exec?hr="+hr+"&spo2="+spo2+"&akselox="+akselox+"&akseloy="+akseloy+"&akseloz="+akseloz);




const insertQuery = 'INSERT INTO heart(hr, spo2,akselox,akseloy,akseloz) VALUES($1,$2,$3,$4,$5) RETURNING *';

const userData = {
			spo2: spo2,
			hr: hr,
			akselox: akselox,
			akseloy: akseloy,
			akseloz: akseloz,
		
	};


await pool.query(insertQuery, [hr, spo2, akselox,akseloy,akseloz], (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Inserted row with ID: ${res.rows[0].id}`);
  }
  // pool.end();
});


console.log(json);;
res.status(200).json(json);


 


}




module.exports = {sendDataToSps,reload,getData};
