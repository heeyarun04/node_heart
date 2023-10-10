const axios = require('axios');
const fs = require('fs');
const pool = require('../koneksi_db/koneksi');


async function identitas(req, res){
	const identitas = {
		nama:'ian',
		alamat:'solo',
		umur:12,

	}
	res.status(200).json(identitas);
}

async function penilaian(req, res){
	const id = req.params.id;
	if (id >0 && id <=5 ) {
		var result = 'buruk';
	}else if(id > 5){
		var result = 'baik';

	}else if(id == ""){
		var result = 'nilai kosong';
	}
	res.status(200).json({msg:result});
}

async function kirimData(req,res){
	const data = req.body;
	var kipas = 0;
	var humidifier = "";
	if (data.temp > 0 && data.temp <=10 ) {
		 kipas = 1;
	}else if (data.temp >10  && data.temp <=20 ) {
		 kipas = 2;
	}else if (data.temp >20  && data.temp < 30 ) {
		 kipas = 3;
	}else{
		 kipas = 4;
	}

if (data.hum > 0 && data.hum <=50 ) {
		 humidifier = "on";
	}else {
		 humidifier = "off";

	}


	res.status(200).json({
		'pesan':{
			"kipas": kipas,
			"humidifier": humidifier,
		}
	});
}


async function weather(req, res) {

    const apiKey = '6c1afb710ddeda10ae6ee2390c228126'; // Ganti dengan kunci API Anda
    const city = req.query.city || 'Surakarta'; // Anda dapat menerima kota dari permintaan
    try {


        // Buat permintaan ke OpenWeather API
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        // console.log(response)
        // // Kirim data suhu dan kelembaban sebagai JSON ke Node-RED
        const suhu = response.data.main.temp;
        const kelembaban = response.data.main.humidity;

        // // Kirim data cuaca sebagai respons
        res.json({ suhu: suhu, kelembaban: kelembaban });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data cuaca.' });
    }

}


async function sendData(req,res){

	var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ceks"
});



	const data = req.body;

  


const json = {
		'pesan':{
			"suhu": data.temp,
			"kelembaban": data.hum,
		}
	};


res.status(200).json(json);

 

const response = await axios.get(`https://script.google.com/macros/s/AKfycbxJ93dMWgpBh4B-gAC9Z1PEAOqSCa1JRiGGAALcRDlS2-IST3vJHz4gLFKQaHs1A4HWqA/exec?&suhu=`+data.temp+`&kelembaban=`+data.hum);

// const jsonString = JSON.stringify(json);
// fs.writeFile('./coba.json', jsonString, err => {
//     if (err) {
//         console.log('Error writing file', err);


//     } else {
//         console.log('Successfully wrote file'+query);

//     }
// })


// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = 'INSERT INTO suhu (kipas,humidifier,suhu,kelembaban) VALUES ("'+kipas+'","'+humidifier+'","'+data.temp+'","'+data.hum+'" )';
//   console.log(sql);
//    con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });

}



async function jsonSpreadsheet(req, res) {

    
        // Buat permintaan ke OpenWeather API
        const response = await axios.get(`https://script.google.com/macros/s/AKfycbz8M6AdMQ0HpQb_F1sCXO-xzoVo10gyyvXDXZxLfRgkJ4Odo3ZhNdesRC9VCSwRsB27_w/exec`);

    // console.log(response);
       // const suhu = response.data[].columnB;
       // console.log(suhu);

       res.status(200).json(response.data);


     

}

async function wait(req,res){
	//ini utuk ambil data dari spreadsheet ke html local node js
   const response = await axios.get(`https://script.google.com/macros/s/AKfycbz8M6AdMQ0HpQb_F1sCXO-xzoVo10gyyvXDXZxLfRgkJ4Odo3ZhNdesRC9VCSwRsB27_w/exec`);

       // const suhu = response.data[].columnB;
       // console.log(suhu);
var data = response.data;

      res.render('views/index',{data:data});
}

async function fromdb(req,res){



	var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ceks"
});



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = 'SELECT * FROM suhu';

   con.query(sql, function (err, rows) {
 			
 			res.render('views/fromdb',{
				data:rows
			});

			console.log(rows);

  });
});


}




async function refGetData(req,res){
	  const response = await axios.get(`https://script.google.com/macros/s/AKfycbwku3rGwox68g72taAwiwADmPFY-AczJZYOP6rEjnIDo3VefOySwP01qdn8vdUFsV95pA/exec`);

     console.log(response.data);
       // const suhu = response.data[].columnB;
       // console.log(suhu);
var data = response.data;
       res.status(200).json(response.data);

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


await pool.query(insertQuery, [userData.hr, userData.spo2, userData.akselox,akseloy,akseloz], (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Inserted row with ID: ${res.rows[0].id}`);
  }
  // pool.end();
});


console.log(json);;
res.status(200).json(json);


// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "alkes"
// });
// //


// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");

//    let a = {
//             spo2: spo2,
// 			hr: hr,
// 			akselox: akselox,
// 			akseloy: akseloy,
// 			akseloz: akseloz,
//         }
        
//   var sql = 'INSERT INTO heart SET ?';

//    con.query(sql,a, function (err, rows) {
 			
 		

//   });
// });


 


}


async function refSendData(req,res){




	const data = req.body;

  var suhu_potensio = req.query.suhu_potensio;
  var kelembaban_potensio = req.query.kelembaban_potensio;


const json = {
			"suhu_potensio": suhu_potensio,
			"kelembaban_potensio": kelembaban_potensio,
		
	};

console.log(json);;
res.status(200).json(json);

 

const response = await axios.get(`https://script.google.com/macros/s/AKfycbzZgsXTtV9kTn9OyeEePBZhwGn9tZfaVLCogEWzyruFM6VCWhQ8foqrY2G_qt7_q1eNXA/exec?&suhu=`+suhu_potensio+`&kelembaban=`+kelembaban_potensio);


}




async function refGetLogData(req,res){
	  const response = await axios.get(`https://script.google.com/macros/s/AKfycbxg8Mbmzbpc9ua6dn-Ney9Ap8Bs_8Ab-CaccPfePNjYfwaNmbybU6y0RAaftDBfRtsC/exec`);

     console.log(response.data);
       // const suhu = response.data[].columnB;
       // console.log(suhu);
var data = response.data;
var panjang = response.data.length;

var largest = 0;


			var json = {
				data : response.data,
				length : panjang,
				last : response.data[panjang-1],
				first : response.data[1],

			}
       res.status(200).json(json);

}



async function lampPost(req,res){


	const data = req.body;
  

const json = {
		'pesan':{
			"hasillamp": data,
		}
	};

res.status(200).json(json);

 

const response = await axios.get("https://script.google.com/macros/s/AKfycbxpZsvBjwwlbr3QcD6baknL2T3Uu6z18aYe_expmLsNX80EAb2GJC80kXqKQOb4-5Iqiw/exec?lampu="+data.lampu);


}



async function lampGet(req,res){
	  const response = await axios.get(`https://script.google.com/macros/s/AKfycbzl_GwG15C178LgmDJiyS_XqgwZVf2CjK5mplsSouP-0lMJS60q4Pz1nmstHgluzBrrPg/exec`);

     console.log(response.data[1]);
       // const suhu = response.data[].columnB;
       // console.log(suhu);
       var data = response.data[1];
       res.status(200).json(data);

}




module.exports = {identitas,penilaian,kirimData,weather,sendData,jsonSpreadsheet,wait,fromdb,refGetData,refSendData,refGetLogData,lampPost,lampGet,sendDataToSps};
