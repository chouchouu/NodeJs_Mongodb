const Admin = require('../models/admin');

exports.login =function(req,res){
    Admin.findOne({email:req.body.email},(err,user) =>{
        if(data){
            if
            (data.password = req.body.password){
                res.redirect('home');
            }
        }
    });
};
//đăng kí tài khoản
exports.register = function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

console.log (password);

    if(password !== password2){
        console,log('Password do not match');
    }else{
        let admin = new Admin({
            email:email,
            password:password,
        });
        admin.save(function(err){

            if(err){
                console.log(err);
                return;
            }//else{
              //  Response.render('SignIn');
           // }

        });
    }
};