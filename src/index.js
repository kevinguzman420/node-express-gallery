const express = require("express");
const path = require("path");
const morgan = require("morgan");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { format } = require("timeago.js");

// Initializations
const app = express();
require("dotenv").config();
require("./database");

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// Middlewares
app.use(morgan('dev')); // Para ver los logs de las peticiones entrantes.
app.use(express.urlencoded({extended: false})); // Para administrar los inputs de los formularios. Le dice a express que no se estara utilizando inputs complicados. Las imagenes se estaran procesando con Multer.
const storage = multer.diskStorage({
	destination: path.join(__dirname, 'public/img/uploads'),
	filename: (req, file, cb, filename) => {
		cb(null, uuidv4() + path.extname(file.originalname));
	}
})
app.use(multer({ storage: storage }).single('image')); // Le dice al multer donde se guardaran las imagenes subidas, cuantas imagenes se van subir "single" y el nombre del input donde se subiran "image"

// Global variables
app.use((req, res, next) => {
	app.locals.format = format; // Crea una funcion para ser accesible desde ejs 
	next();
})

// Routes
app.use(require("./routes/index"));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get("port"), () => {
	console.log(`Server on port ${app.get("port")}`);
})
