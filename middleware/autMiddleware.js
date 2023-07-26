const jwt = require('jsonwebtoken');
const User = require('../modules/user')

module.exports.requireAuth = function (req, res, next) {
    
 	const token = req.cookies['jwt'];
 	console.log(token);
    if (token==null) {
        res.redirect('/login');
        return;
	}
    jwt.verify(token, 'holamola', function (err, decoded) {
        if (err) {
            console.log(err);
            return res.redirect('/login'); 
        } else {
            console.log(decoded);

            next();
            }
    });
    
}

// checkUser
module.exports.checkUser =  function (req, res, next) {
    
 	const token = req.cookies['jwt'];
    let user=null;
 	
    if (token==null) {
       
        next();
        return ;
	}
    jwt.verify(token, 'holamola', async function (err, decoded) {
        if (err) {
            console.log(err);
            next();
            
        } else {
            user = await User.findById(decoded.id);
            res.locals.user=user

            next();
            }
    });
    
}