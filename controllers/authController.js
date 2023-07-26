const User = require('../modules/user')
const bcrypt = require("bcrypt")
const cookie=require('cookie-parser')
const jwt=require('jsonwebtoken')

/*-------functions-------*/
//Errors
function errorandling(res,error){
	
	if(error.message.includes('user validation failed')){
       console.log(error)
	};
	
	res.status(400).render('error',{errors:Object.values(error.errors)})
     
}

//Cookies
 function createToken(id){
 	return jwt.sign({id},'holamola',{expiresIn:3*24*60*60});
 }

 //hashing
 async function hashing (password) {

	  try {
		const hash = await bcrypt.hash(password, 10);
		return hash ;
		
	  } catch (error) {
		console.error('Error hashing password:', error);
		return null;
	  }
	
  }


/*--------signup--------*/
//Get sign up
module.exports.getSignup= function(req,res){
	res.render('signup');
};

//Post sign up
module.exports.postSignup= async function(req,res){
	let {email,password}=req.body;
 
  

	//save data on database
	const user = new User({email:email,password:password});
	user.save()
		.then(() => {
			console.log('new user saved on database');
			const token=createToken(user._id);
			res.cookie('jwt',token,{httpOnly:true,maxAge:3*24*60*60*1000});

			res.render('privatepage');


		})
		.catch(error=> {
				errorandling(res,error);
		} );

 
    
};

/*--------login--------*/
//Get Login
module.exports.getLogin= function(req,res){
	res.render('login');
};

//Post Login
module.exports.postLogin= async function(req,res){
   
    let {email,password}=req.body;
    try{
    	const user = await User.login(email,password);
    	const token=createToken(user._id);
		res.cookie('jwt',token,{httpOnly:true,maxAge:3*24*60*60*1000});
		res.render('privatepage');

    }catch(error){
    	
        res.status(400).render('login-errors',{error:error})

     
    }
		


};
/*------logout------*/
module.exports.getLogout= function (req,res){
	res.cookie('jwt','',{maxAge:1});
	res.redirect('/')
}