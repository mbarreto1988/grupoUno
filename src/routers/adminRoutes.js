const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const adminController = require(path.resolve(__dirname,'../controllers/adminController'));
// //Requerir el middleware Ruta Acceso
// const acceso = require(path.resolve(__dirname,'../middlewares/acceso'));

//Como podemos indicar para subir el archivo nombre y donde guardarlo
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/img/producto'));
    },
    filename: function (req, file, cb) {
      cb(null, 'producto-'+Date.now()+path.extname(file.originalname))
    }
  })
   
const upload = multer({ storage })

router.get('/administrar', adminController.index);
// router.get('/administrar/create', adminController.create);

// router.post('/administrar/create', upload.single('image'), adminController.save);
router.get('/administrar/detail/:id', adminController.show);
router.get('/administrar/edit/:id', adminController.edit);
router.put('/administrar/edit/:id', upload.single('imagen'), adminController.update);
router.delete('/administrar/delete/:id', adminController.destroy);


/*** CREATE ONE PRODUCT ***/ 
router.get('/administrar/create', adminController.create); 
router.post('/administrar/create', upload.single("imagen"), adminController.store); 


module.exports = router;