const express =require('express');
const mongoose = require('mongoose');
const adminRoute = require('./routes/admin.js');
const buyRoute = require('./routes/api.js');
const app =express();


//const bodyParser =require('body-parser');
//gọi model
/*const Admin =require('./app/models/admin');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());*/


app.use(adminRoute);
app.use(buyRoute);
app.use(express.static('public'));
app.use(express.static('uploads'));
mongoose.set('useCreateIndex',true);

app.listen(process.env.PORT || 8000,() =>{});


/*app.get('/signup',(req,res)=>{
  res.render('sign');
});
app.get('/signin',(req,res)=>{
    res.render('signin');
  });
  app.get('/home',(req,res)=>{
    res.render('home');
  });*/

/*app.post('/sign',(req,res) =>{
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
   
});*/

//kết nối monggo
mongoose.connect(
    'mongodb+srv://admin:admin@cluster0-nfn0g.gcp.mongodb.net/test?retryWrites=true&w=majority',
    {
        useUnifiedTopology:true, useNewUrlParser:true
    },
    err =>{
        if(err){
            console.log("Can not connect" +err);
        }else{
            console.log("Connect to monggodb successful");
        }
    }
);
//Cấu hình handlebars
const exphbs = require('express-handlebars');
app.engine(
    '.hbs',
    exphbs({
    
        defaultLayout:'',
    })
);
app.set('view engine','.hbs');
//xử lí đăng nhập
/*app.post('/signin',function(req,res){
    Admin.findOne({email:req.body.email}).then(data=>{
        if(data){
            if
            (data.password = req.body.password){
                res.redirect('home');
            }
        }
    });
})*/

//chưa xử lí

/*app.post('/home',function(req,res){
    res.render('home')
});
app.post('/forgotpass',function(req,res){
    res.render('forgotpass')
});
app.post('/shop',function(req,res){
    res.render('shop')
});
app.post('/add',function(req,res){
    res.render('addproduct')
});
app.post('/type',function(req,res){
    res.render('type')
});
app.post('/addtype',function(req,res){
    res.render('addtype')
});*/


//chưa kết nối monggo
/*const userGo ={};
app.get('/',function(req,res){
    res.sendFile(__dirname +'/view/form.html')
});
app.get('/index',function(req,res){
    if(!userGo.username){
        res.sendFile(__dirname +'/view/form.html');
    }
    res.sendFile(__dirname + '/view/main.html');
});



app.post('/main',urlencodedParser,function(req,res){
   // res.sendFile(__dirname + '/view/main.html')
user ={
       username:req.body.email,
       password:req.body.pwd,
   } 
   if(user.username =="gd@gmail.com" && user.password =="1808"){
    userGo.username = user.username;
    res.writeHead(301,{"Location": "http://" +req.headers['host']+'/index'});
    res.end();

    
    //res.sendFile(__dirname + '/view/main.html');
   }else{
       res.sendFile(__dirname +'/view/form.html')
   }
});
app.post('/register',function(req,res){
    res.sendFile(__dirname +'/view/register.html')
});
app.post('/forgotpass',function(req,res){
    res.sendFile(__dirname +'/view/forgotpass.html')
});
app.post('/shop',function(req,res){
    res.sendFile(__dirname +'/view/shop.html')
});
app.post('/add',function(req,res){
    res.sendFile(__dirname +'/view/addproduct.html')
});
app.post('/type',function(req,res){
    res.sendFile(__dirname+'/view/type.html');
});
app.post('/addtype',function(req,res){
    res.sendFile(__dirname+'/view/addtype.html')
});*/
