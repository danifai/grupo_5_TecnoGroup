const path = require('path');
const { body } = require('express-validator');

const validations = [
  body('name_and_surname')
    .notEmpty()
    .withMessage('Tienes que escribir un nombre y apellido')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Minimo 2 caracteres'),
  body('email')
    .notEmpty()
    .withMessage('Tienes que escribir un E-mail')
    .bail()
    .isEmail()
    .withMessage('Debes escribir un formato de correo válido'),
  body('address')
    .notEmpty()
    .withMessage('Tienes que escribir una dirección'),
  body('phone')
    .notEmpty()
    .withMessage('Tienes que escribir un teléfono'),
  body('country')
    .notEmpty()
    .withMessage('Tienes que elegir un país'),
  body('password')
    .notEmpty()
    .withMessage('Tienes que escribir una contraseña')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Minimo 8 caracteres'),

  body('avatar').custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];


    if (!file) {
      throw new error('Tienes que subir una imagen')
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new error(`Las extensiones de archivos permitidos son ${acceptedExtensions.join(',')}`)
      }
    }
    return true;
  })
]

module.exports = validations