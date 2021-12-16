const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");

const auth = require("./routes/auth")

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = require('./config/keys').mongoURI;

mongoose.connect(
    uri, 
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify : false }
);
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Se ha conectado a la base de datos correctamente");
});

app.listen(port, () => {
    console.log(`El servidor escucha por el puerto: ${port}`);
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
//

//import routes
const authRoutes = require('./routes/auth');

const recetasRouter = require('./routes/recetas');
const usuariosRouter = require('./routes/usuarios');
const sopasRouter = require('./routes/sopas');
const pastayarrozRouter = require('./routes/pastayarroz');
const carneRouter = require('./routes/carne');
const pescadoRouter = require('./routes/pescado');
const vegetarianoRouter = require('./routes/vegetariano');
const celiacoRouter = require('./routes/celiaco');
const acompaniamientoRouter = require('./routes/acompaniamiento');
const salsasycremasRouter = require('./routes/salsasycremas');
const postresydulcesRouter = require('./routes/postresydulces');
const panRouter = require('./routes/pan');
const bebidaRouter = require('./routes/bebida');
const desayunoRouter = require('./routes/desayuno');
const otrosRouter = require('./routes/otros');

//routes middleware
app.use('/api', authRoutes);

app.use('/recetas', recetasRouter);
app.use('/usuarios', usuariosRouter);
app.use('/sopas', sopasRouter);
app.use('/pastayarroz', pastayarrozRouter);
app.use('/carne', carneRouter);
app.use('/pescado', pescadoRouter);
app.use('/vegetariano', vegetarianoRouter);
app.use('/celiaco', celiacoRouter);
app.use('/acompaniamiento', acompaniamientoRouter);
app.use('/salsasycremas', salsasycremasRouter);
app.use('/postresydulce', postresydulcesRouter);
app.use('/pan', panRouter);
app.use('/bebida', bebidaRouter);
app.use('/desayuno', desayunoRouter);
app.use('/otros', otrosRouter);
