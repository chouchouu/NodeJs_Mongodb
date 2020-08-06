const adminController = require('../controllers/admin');
const buyController = require('../controllers/buy');
const typeController = require('../controllers/type');
//
const express =require('express');
const bodyParser =require('body-parser');
const router = express.Router();
const multer =require('multer');
//import model
const Admin = require('../models/admin');
const Buy = require('../models/buy');
const NameType =require('../models/nametype');

//import controllers

const session =  require('express-session');
const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//cấu hình pasport
router.use(
    session({
        secret:'mysecret',//bắc buộc
        resave:true,
        saveUninitialized:true,
        cookie:{
            maxAge:1000*60*5//time tồn tại
        },
    })
);
//hàm khởi tạo passport
router.use(Passport.initialize());
router.use(Passport.session());
//xác nhận thông tin đăng nhập
Passport.use(new LocalStrategy(
    {
        usernameField:'email',
        passwordField:'password',
    },
    (email,password,done) => {
        Admin.findOne({email:email,password:password},function(err,user) {
            console.log(user);
            if(err){
                console.log(err);
            }
            if(user){
                //thành công trả về true với giá trị user
                return done(null, user);
            }else{
                return done(null,false);
            }
        });
    }
)
);
//chọn thuộc tính qmail user ghi vào cookie
Passport.serializeUser((user,done) => {
    done(null,user.email);
});
//biến cookieId chính là giá trị user.email 
Passport.deserializeUser((cookieId,done) => {
    Admin.findOne({email:cookieId},function(err,user) {
        if (err){
            console.log(err);
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
});
//khai báo phương thức đăng nhập
const isAuthenticated =function(req,res,next){
    if (req.isAuthenticated()) return next();
    res.redirect('/');//nếu chưa đăng nhậ quay về trang login
};

//lấy dữ liệu từ form
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.get('/sign',(req,res)=>{
    res.render('sign');
  });
router.post('/sign',adminController.register);
router.get('/',(req,res)=>{
    res.render('signin');
});
//router.post('/signin',adminController.login);
//thành công chuyển đến trang success, thất bại failu
router.post('/',Passport.authenticate('local',{successRedirect:'/home',failureRedirect:'/'}));

router.get('/home',isAuthenticated,(req,res)=>{
    res.render('home');
});
//router.get('/shop',(req,res)=>{
//    res.render('shop');
//});
//isAuthenticated yêu cầu đăng nhập mới được xem nội dung
router.get('/shop',isAuthenticated,buyController.getAll);
router.post('/shop',function(req,res){
    res.render('shop')
});

router.get('/edit/:id',buyController.getBuy);
//edit
router.post('/edit',buyController.edit);
//delete
router.get('/delete/:id',buyController.delete);

router.post('/home',function(req,res){
    res.render('home')
});
router.post('/forgotpass',function(req,res){
    res.render('forgotpass')
});

router.post('/add',function(req,res){
    res.render('addproduct')
});


//Loại
router.post('/type',function(req,res){
    res.render('type')
});
router.get('/type',isAuthenticated,typeController.getAll);
//router.get('/type',isAuthenticated,typeController.getAll);
//router.post('/typeid',typeController.addtype);
router.post('/edittype',typeController.edittype);
router.get('/edittype/:id',typeController.getType);
router.get('/deletetype/:id',typeController.deletetype);
router.post('/addtype',function(req,res){
    res.render('addtype')
});
//cấu hình multer
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'./uploads');
    },
    filename:(req,file,cb) =>{
        cb(null,file.originalname);
    },
});
const upload =multer({storage: storage});
router.post('/upload',upload.single('image'),(request,response)=>{
    let buy =new Buy({
        name:request.body.name,
        price:request.body.price,
        describe:request.body.describe,
        //kieer
        tentype:request.body.tentype,
        //chỉ hiện tên
        image:request.file.originalname,
    
    });
    buy.save(function(err){
        if(err){
            console.log(err);
            return;
        }else{
            response.redirect('/shop');
        }
    });
});
//loai
router.post('/uploadtype',upload.single('picture'),(request,response)=>{
    let kieu =new NameType({
        matype:request.body.matype,
        loaitype:request.body.loaitype,
        picture:request.file.originalname,
    });
    kieu.save(function(err){
        if(err){
            console.log(err);
            return;
        }else{
            response.redirect('/type');
        }
    });
});
router.get('/signout',(req,res)=>{
    req.logout();
    res.redirect("/");
})



    module.exports=router;