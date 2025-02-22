const axios = require('axios');
const fs = require('fs');
const pool = require('../koneksi_db/koneksi');


async function index(req,res){


res.render('views/index',{ currentPath: '/' });


}


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

  var dari = req.query.dari;
  var sampai = req.query.sampai;

  
console.log("SELECT * FROM heart WHERE timestamp >='"+dari+"' AND timestamp <='"+sampai+"' ");

	pool.query("SELECT * FROM heart WHERE timestamp >='"+dari+"' AND timestamp <='"+sampai+"' ", (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  const data = result.rows;
  // Pass data to your HTML rendering function


	res.status(200).json(data);


});


}


async function heartNew(req,res){

	pool.query('SELECT hr FROM heart order by id DESC LIMIT 1', (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  const heart = result.rows;

	res.status(200).json(heart);


});


}


async function oxyNew(req,res){

  pool.query('SELECT spo2 FROM heart order by id DESC LIMIT 1', (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  const heart = result.rows;

  res.status(200).json(heart);


});


}



async function suhuNew(req,res){

  pool.query('SELECT suhu FROM heart order by id DESC LIMIT 1', (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  const heart = result.rows;

  res.status(200).json(heart);


});


}



async function gerakNew(req,res){

  pool.query('SELECT nomor FROM akselo order by id_akselo DESC LIMIT 1', (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  const heart = result.rows;

  res.status(200).json(heart);


});


}





async function sendDataToSps(req,res){




	const data = req.body;

  var spo2 = req.query.spo2;
  var hr = req.query.hr;
  var akselox = req.query.akselox;
  var akseloy = req.query.akseloy;
  var akseloz = req.query.akseloz;
  var suhu = req.query.suhu;

//const response = await axios.get("https://script.google.com/macros/s/AKfycbwhi0FRPnUyq_5dFZkBcD4na8z0sB1DFYtJ-05DIn_C8l4ezb2NV5CMB_gmeDl2Urv3cg/exec?hr="+hr+"&spo2="+spo2+"&akselox="+akselox+"&akseloy="+akseloy+"&akseloz="+akseloz);



const json = {
			"spo2": spo2,
			"hr": hr,
			"akselox": akselox,
			"akseloy": akseloy,
			"akseloz": akseloz,
			"suhu": suhu,
		
	};


	



const insertQuery = 'INSERT INTO heart(hr, spo2,akselox,akseloy,akseloz,suhu) VALUES($1,$2,$3,$4,$5,$6) RETURNING *';

const userData = {
			spo2: spo2,
			hr: hr,
			akselox: akselox,
			akseloy: akseloy,
			akseloz: akseloz,
			suhu: suhu,
		
	};


await pool.query(insertQuery, [hr, spo2, akselox,akseloy,akseloz,suhu], (err, res) => {
    console.log(insertQuery);
	
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




async function grafikHr(req,res){


  var dari = req.query.dari;
  var sampai = req.query.sampai;


  pool.query("SELECT * FROM heart WHERE timestamp >='"+dari+"' AND timestamp <='"+sampai+"' ", (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  const data = result.rows;
  // Pass data to your HTML rendering function
  

  res.status(200).json(data);



});


}





async function keaktifan_1(req,res){



  var dari = req.query.dari;
  var sampai = req.query.sampai;

  pool.query("SELECT nomor, COUNT(id_akselo) AS counts FROM akselo WHERE created_at >='"+dari+"' AND created_at <='"+sampai+"' GROUP BY nomor", (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  const heart = result.rows;

  res.status(200).json(heart);


});



}



async function keaktifan_2(req,res){

  var dari = req.query.dari;
  var sampai = req.query.sampai;
  pool.query("SELECT nomor, COUNT(nomor) AS counts FROM akselo WHERE created_at >='"+dari+"' AND created_at <='"+sampai+"' GROUP BY nomor ORDER BY counts DESC LIMIT 1", (err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  const heart = result.rows;

  res.status(200).json(heart);


});

}


async function hrMax(req,res){

  var dari = req.query.dari;
  var sampai = req.query.sampai;

  pool.query("SELECT max(hr) as max FROM heart  WHERE timestamp >='"+dari+"' AND timestamp <='"+sampai+"' ", (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  const heart = result.rows;

  res.status(200).json(heart);


});
}



async function hrMin(req,res){


  var dari = req.query.dari;
  var sampai = req.query.sampai;


  pool.query("SELECT min(hr) as min FROM heart  WHERE timestamp >='"+dari+"' AND timestamp <='"+sampai+"' ", (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  const heart = result.rows;

  res.status(200).json(heart);


});

}




async function oxyMax(req,res){


  var dari = req.query.dari;
  var sampai = req.query.sampai;



  pool.query("SELECT max(spo2) as max FROM heart  WHERE timestamp >='"+dari+"' AND timestamp <='"+sampai+"' ", (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  const heart = result.rows;

  res.status(200).json(heart);


});

}

async function oxyMin(req,res){


  var dari = req.query.dari;
  var sampai = req.query.sampai;


  pool.query("SELECT min(spo2) as min FROM heart  WHERE timestamp >='"+dari+"' AND timestamp <='"+sampai+"' ", (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  const heart = result.rows;

  res.status(200).json(heart);


});

}


async function sendAkselo(req,res){




  const data = req.body;

  var modus = req.query.modus;
  var keterangan = req.query.keterangan;
  var nomor = req.query.nomor;



const json = {
      "modus": modus,
      "keterangan": keterangan,
      "nomor": nomor,
      
    
  };


  



const insertQuery = 'INSERT INTO akselo (modus, keterangan,nomor) VALUES($1,$2,$3) RETURNING *';

const userData = {
      modus: modus,
      keterangan: keterangan,
      nomor: nomor,
    
  };


await pool.query(insertQuery, [modus, keterangan, nomor], (err, res) => {
    console.log(insertQuery);
  
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








async function pergerakan_sekarang(req,res){

  var dari = req.query.dari;
  var sampai = req.query.sampai;
  pool.query("SELECT * FROM akselo WHERE created_at >='"+dari+"' AND created_at <='"+sampai+"' ", (err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  const heart = result.rows;

  res.status(200).json(heart);


});

}




async function detak(req,res){


res.render('views/detak',{ currentPath: '/detak' });


}



async function nafas(req,res){


res.render('views/nafas',{ currentPath: '/nafas' });


}


async function suhu(req,res){


res.render('views/suhu',{ currentPath: '/suhu' });


}


async function akselo(req,res){


res.render('views/akselo',{ currentPath: '/akselo' });


}

async function jadwal(req,res){


res.render('views/jadwal',{ currentPath: '/jadwal' });


}


module.exports = {sendDataToSps,reload,getData,index,heartNew,oxyNew,gerakNew,suhuNew,grafikHr,keaktifan_1,keaktifan_2,hrMax,hrMin,oxyMax,oxyMin,sendAkselo,detak,nafas,suhu,akselo,pergerakan_sekarang,jadwal};
