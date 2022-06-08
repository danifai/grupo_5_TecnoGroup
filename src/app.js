// Módulos
const express = require('express');
const path = require('path');
const mainRouter = require("./routes/mainRouter");
const productsRouter = require("./routes/productsRouter");
const methodOverride = require('method-override');
const index =require ("./routes/index")
var session  = require ("express-session")
// ************ express() ************
const app = express();

// ************ Template Engine - ************
app.set("view engine", "ejs");
app.set('views', path.resolve(__dirname, './views'));

// ************ Middlewares ************
app.use(express.static('public'));
app.use ( methodOverride ('_method') );
app.use (session({secret: "Esto es un secreto"}))

// ************ Route System require and use() ************
app.use("/", mainRouter);
app.use('/products', productsRouter);
app.use('/index', index);

app.listen(3002, () => { console.log('Servidor arriba en el puerto 3002 🤓👌');})
// app.use((req, res, next )=> {res.status (404).render ("not-found")});



