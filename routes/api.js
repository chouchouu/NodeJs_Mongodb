const express = require("express");
const router = express.Router();
//import controllers
const API = require('../controllers/api');
//getuser
router.get('/api/admin',API.getUser);
//getAll
router.get('/api/buy', API.getAll);
//get san pham theo id
router.get('/api/loaisanpham/:id',API.getSp);
//getcatagory
router.get('/api/catagory',API.getCatagory);

router.get('/api/getsp',API.getloai);

router.get('/api/buy/:id', API.getBuy)
//edit
router.get('/api/buy/edit/:id', API.editBuy);
//delete
router.delete('/api/buy/delete/:id', API.deleteBuy);
module.exports = router;