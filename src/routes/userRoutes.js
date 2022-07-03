const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { get } = require('express/lib/response');


const usersController = require(path.resolve(__dirname,'../controllers/usersController'));

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

  // Formulario de registro
router.get('/register', guestMiddleware, usersController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, usersController.login);

// Procesar el login
router.post('/login', usersController.loginProcess);

// Perfil de Usuario
router.get('/profile/', authMiddleware, usersController.profile);

// Logout
router.get('/logout/', usersController.logout);

router.get('/administrar',usersController.index)

router.get('/delete/:id', usersController.destroy);

/*   router.get('/users',usersController.index);
  router.get('/users/create',usersController.create); 
  router.post('/users/create', usersController.save); 
  router.get('/users/detail/:id', usersController.show);
  router.get('/users/edit/:id', usersController.edit);
  router.put('/users/edit/:id', usersController.update);
   */


module.exports = router;