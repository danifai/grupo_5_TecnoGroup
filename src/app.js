// Módulos
const bp = require('body-parser')
const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const PORT = process.env.PORT || 3002;

const methodOverride = require('method-override');
const cookies = require('cookie-parser');

const mainRouter = require("./routes/mainRouter");
const adminRouter = require('./routes/admin');
const userRoutes = require('./routes/userRoutes');
const productAPIRouter = require("./routes/api/products")
const apiCategoriesRouter = require('./routes/api/categoriesRouter')

console.log('Iniciando aplicación') // Debugging log

// ************ express() ************
const app = express();

app.set('trust proxy', true);
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const usersAPIController = require('./controllers/api/usersAPIController');

//Aquí llamo a la ruta de las api de users
const apiUsersRouter = require('./routes/api/users')

// ************ Template Engine - ************
app.set("view engine", "ejs");
app.set('views', path.resolve(__dirname, './views'));

// ************ Middlewares ************
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(methodOverride('_method'));
app.use(session({
  secret: "Shhh, It's a secret",
  resave: false,
  saveUninitialized: false,
}));

app.use(express.static('public'));

app.use(bp.json())
/* app.use(bp.urlencoded({ extended: true })) */
app.use(express.urlencoded({ extended: false }));
app.use(cookies());

app.use(userLoggedMiddleware);

// ************ Route System require and use() ************
app.use("/", mainRouter);
app.use("/administrar", adminRouter);
app.use('/users/', userRoutes);

app.use('/api/categories', apiCategoriesRouter);
//Aquí creo la colección de mis recursos de users (APIs)
app.use('/api/users', apiUsersRouter);
app.use('/api/products/', productAPIRouter);

app.listen(PORT, () => { console.log(`Servidor arriba en el puerto ${PORT} 🤓👌`); })
app.use((req, res, next) => { res.status(404).render('not-found') });
