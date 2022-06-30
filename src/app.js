// Módulos
const express = require('express');
const path = require('path');
const mainRouter = require("./routes/mainRouter");
const methodOverride = require('method-override');
const adminRouter = require('./routes/admin');
const usersRoutes = require('./routes/users');

// ************ express() ************
const app = express();

// ************ Template Engine - ************
app.set("view engine", "ejs");
app.set('views', path.resolve(__dirname, './views'));

// ************ Middlewares ************
app.use(express.static('public'));
app.use ( methodOverride ('_method') );

// ************ Route System require and use() ************
app.use("/", mainRouter);
app.use(adminRouter);
app.use(usersRoutes);

app.listen(3002, () => { console.log('Servidor arriba en el puerto 3002 🤓👌');})
app.use((req, res, next )=> {res.status (404).render ('not-found')});



