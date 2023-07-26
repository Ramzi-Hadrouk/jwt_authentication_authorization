const express = require('express');
const mongoose = require('mongoose');
const router=require('./routes/authRoutes')
const app = express() ;
/*---Middelwares---*/
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
/*--- connect to database ---*/
mongoose.connect('mongodb://localhost:27017/authDb')
	.then( ()=> {
		console.log(`conected to DB  `)
		//listen to the port
		app.listen(4550,()=>{
			console.log(`server is working on: 127.0.0.1:${4550}`)
		})
	})
	.catch( error => console.log(error));

/*--- routes ---*/

app.get('/',(req,res)=>{
	res.render('home')
}) ;

app.use(router);


