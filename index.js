const app = require('./routes/app');

const multer = require('multer');
const fileUpload = multer();

//const authController = require('./auth/AuthController');

const loginRoutes = require('./routes/login');
const categoriaRoutes = require('./routes/catCategoria');
const especialidadRoute = require('./routes/especialidad');
const usuarioRoute = require('./routes/usuario');
const siUsuarioSucursalRol = require('./routes/siUsuarioSucursalRol');
//const uploadCloudinary = require('./controllers/uploadCloudinary');
const catEjercicios = require('./routes/catEjercicios');

app.use('/auth', loginRoutes);
app.use('/categoria', categoriaRoutes);

app.use('/especialidad', especialidadRoute);
app.use('/usuario', usuarioRoute);
app.use('/usuario-rol', siUsuarioSucursalRol);
app.use('/ejercicios', catEjercicios);



/*

const pagos = require('./controllers/pagos');
const cargos = require('./controllers/cargos');
const { encriptar } = require('./utils/Utils');
const gastos = require('./controllers/gastos');
const sucursales = require('./controllers/sucursal');
const alumnoSucursal = require('./controllers/alumno_sucursal');
const catagolos = require('./controllers/catalogos');
const conf = require('./controllers/configuracion');
const https = require("https");
const { validarTokenCompleto } = require('./helpers/helperToken');



const checkAuth = require('./routes/check-auth');
const schedulerJob = require('./routes/schedulerJob');
const alumnoRoute = require('./routes/alumno');
const inscripcionRoute = require('./routes/inscripcion');

//const asistenciaUsuariosRoute = require('./routes/asistenciaUsuarios');
const usuarioRhRoute = require('./routes/usuariosRh');
const corte = require('./routes/corte');
const cobranza = require('./routes/cobranza');

//const siRol = require('./routes/siRol');

const reportesController = require('./routes/reportesController');
const esquemaPagoController = require('./routes/catEsquemaPago');
*/


/*
app.use('/alumnos', alumnoRoute);
app.use('/inscripcion', inscripcionRoute);

app.use('/reportes', corte);
app.use('/cobranza', cobranza);

app.use('/reportes', reportesController);
app.use('/esquema-pago', esquemaPagoController);

app.use('/jobs', schedulerJob);

//app.use('/escolaridad',catEscolaridad);

//Cambio de sucursal
app.get('/sucursal_usuario/:id', authController.obtenerSucursalesUsuario);
app.put('/sucursal_usuario', authController.cambiarSucursalUsuario);

//Asistencia Usuarios
app.use('/asistencia_usuarios', asistenciaUsuariosRoute);

app.use('/usuarios_rh', usuarioRhRoute);

app.get('/genero_alumno', checkAuth, catagolos.getCatGeneroAlumno);

app.get('/pass/:text', (request, response) => {

    console.log("@Encriptar clave ");
    try {

        const { text } = request.params;

        let p = text;

        console.log("@p " + p);

        if (!p) {
            const desiredMaxLength = 5
            p = '';
            for (var i = 0; i < desiredMaxLength; i++) {
                p += Math.floor(Math.random() * 10);
            }
        }


        console.log("@Encriptar clave");

        const enc = encriptar(p);

        console.log("@enc " + enc);

        response.status(200).json({ p: p, enc: enc });
    } catch (error) {
        response.status(200).json(error);
    }
});


//pagos
app.post('/pagos/registrar', checkAuth, pagos.registrarPago);
app.get('/pagos/:id_cargo_balance_alumno', checkAuth, pagos.getPagosByCargoId);
app.put('/pagos/reenviar_comprobante', checkAuth, pagos.reenviarComprobantePago); //Reenviar correo

//imprimir - obtiene html
app.get('/pagos/imprimir/:id_pago/:id_usuario', checkAuth, pagos.imprimirComprobantePago);

app.post('/cargos/registrar', checkAuth, cargos.registrarCargo);
app.get('/cargos/:id_empresa/:id_sucursal', checkAuth, cargos.getCatalogoCargosPorEmpresa);
app.get('/cargos/alumno/:id_alumno/:limite', checkAuth, cargos.getCargosAlumno);
app.get('/balance/:id_alumno', checkAuth, cargos.getBalanceAlumno);
app.put('/cargos/:id_alumno', checkAuth, cargos.eliminarCargos);

app.get('/formas_pagos', checkAuth, catagolos.getFormasPago);

//-Estado de cuenta
app.get('/estado_cuenta/:id_alumno', checkAuth, cargos.obtenerEstadoCuentaAlumno);
app.get('/estado_cuenta/preview/:id_alumno', checkAuth, cargos.obtenerHtmlPreviewEstadoCuenta);
app.get('/estado_cuenta/print/:id_alumno', cargos.obtenerPdfPreviewEstadoCuenta);
app.post('/estado_cuenta/enviar', checkAuth, cargos.enviarEstadoCuentaAlumno);


//gastos
app.get('/gastos/:co_sucursal/:anio_mes', checkAuth, gastos.getGastosPorSucursal);
app.get('/historico_gastos/:co_sucursal', checkAuth, gastos.getSumaMesGastosPorSucursal);
app.post('/gastos', checkAuth, gastos.registrarGasto);
app.put('/gastos', checkAuth, gastos.modificarGasto);
app.delete('/gastos/:id', checkAuth, gastos.eliminarGasto);
app.get('/tipos_gasto/:id_empresa', checkAuth, gastos.getCatalogoTipoGastoPorEmpresa);

//Reporte de gastos
app.get('/reporte_gastos_sucursales/:id_usuario', checkAuth, reporte_gastos.getReporteGastosSucursalesMensualActual);
app.get('/reporte_gastos/:id_sucursal', checkAuth, reporte_gastos.getReporteGastosMensualesPorSucursalTrend);
app.get('/reporte_gastos/:id_sucursal/:mes_anio', checkAuth, reporte_gastos.getReporteDetalleGastosPorSucursal);
app.get('/reporte_gastos_global/:id_usuario', checkAuth, reporte_gastos.getReporteGastosGlobal);
app.get('/reporte_gastos_mes_actual/:id_usuario', checkAuth, reporte_gastos.getReporteGastoMensualActual);

//configuracion
app.get('/configuracion', checkAuth, conf.getConfiguracion);


//sucursales y cambios
app.get('/sucursal/:id_empresa', checkAuth, sucursales.getSucursalPorEmpresa);
app.put('/cambio_sucursal/:id_alumno', checkAuth, alumnoSucursal.cambiarSucursalAlumno);
*/

//Subir imagen
/*
app.post('/foto_perfil', checkAuth, fileUpload.single('image'), (req, res) => {
    let respuesta = validarTokenCompleto(req, res);

    if (!respuesta.tokenValido) {
        console.log(" ((((( Token invalido  )))))");
        return req.status(respuesta.status).send(respuesta);
    } else {
        console.log(" PASA EL TOKEN ");
        uploadCloudinary.uploadImagenPerfil(req, res);
    }
});

*/
console.log("---------registro de todos los endpoints finalizados -----------------");