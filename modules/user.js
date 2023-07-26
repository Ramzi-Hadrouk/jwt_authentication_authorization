const mongoose=require('mongoose');
const {isEmail}=require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");

UserSchema=mongoose.Schema({
	email:{ 
		type:String , 
		required:[true, "please enter the email"] ,
		lowercase:true,
		unique:true, 
		validate :[isEmail,"Please enter a valid email"]
		} ,
	password :{ 
		type:String , 
		required:[true, "please enter the password"] , 
		minlength:[6,"your password must be more than 6 characters! "]
		} ,
	created: { 
		type: Date , 
		require:true, 
		default:Date.now 
	},
})
UserSchema.plugin(uniqueValidator, { message: 'This email is already in use. Please try another email.' });

/*------hashing password function  -----*/
UserSchema.pre('save', async function (next) {
	if (this.isModified('password') || this.isNew) {
	  try {
	  	const salt= await bcrypt.genSalt()
		const hash = await bcrypt.hash(this.password, salt);
		console.log('Plain password:', this.password);
		this.password = hash;
		console.log('Hashed password:', this.password);
	  } catch (error) {
		console.error('Error hashing password:', error);
	  }
	}
	next();
  });

/*------login function -----*/
UserSchema.statics.login = async function (email, password) {
  let user = await this.findOne({ email });
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new Error('The password is not valid');
  }
  throw new Error('The email is not valid');
}

  
//-------

module.exports=mongoose.model('user',UserSchema);
