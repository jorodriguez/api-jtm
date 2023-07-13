const { QUERY, getCatalogo } = require('./sqlHelper');

const getFormasPago = (request, response) => {
    console.log("@getFormasPago");
    getCatalogo(QUERY.FORMA_PAGO, response);
};

const getCatGeneroFamiliar = (request, response) => {
    console.log("@getCatGeneroFamiliar");
    getCatalogo(QUERY.CAT_GENERO_FAMILIAR, response);
};

const getCatGeneroAlumno = (request, response) => {
    console.log("@getCatGeneroAlumno");
    getCatalogo(QUERY.CAT_GENERO_ALUMNO, response);
};


const getCatUnidadRepeticion = (request, response) => {
    console.log("@getCatUnidadRepeticion");
    getCatalogo(QUERY.CAT_UNIDAD_REPETICION, response);
};



module.exports = {
    getCatalogo,
    getFormasPago,
    getCatGeneroFamiliar,
    getCatGeneroAlumno,
    getCatUnidadRepeticion

}