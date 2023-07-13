/*--------signup--------*/
module.exports.getSignup= function(req,res){
	res.render('signup');
};

module.exports.postSignup= function(req,res){
	res.send('New Signup');
};

/*--------login--------*/
module.exports.getLogin= function(req,res){
	res.render('login');
};

module.exports.postLogin= function(req,res){
		res.send('User Login');

};