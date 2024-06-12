const db = require("../database/models");

async function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  let emailInCookie = req.cookies.userEmail;

  if (emailInCookie) {
    let userFromCookie = await db.User.findOne({
      where: {
        email: emailInCookie
      },
      include: [{
        model: db.Role,
        as: 'roles'
      }]
    })

    if (userFromCookie) {
      req.session.userLogged = userFromCookie;
    }
  }

  if (req.session && req.session.userLogged) {
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
      if (res.locals.userLogged.roles) {
          res.locals.isAdmin = res.locals.userLogged.roles.role_name === 'admin';
      } else {
          res.locals.isAdmin = false;
      }
  } else {
      res.locals.isAdmin = false;
  }

  console.log('userLogged:', res.locals.userLogged)
  console.log('isLogged:', res.locals.isLogged); // Debugging
  console.log('isAdmin:', res.locals.isAdmin); // Debugging

  next();
}

module.exports = userLoggedMiddleware;