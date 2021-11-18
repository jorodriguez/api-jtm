
const { QUERY,getCatalogo } = require('./sqlHelper');

const getFormasPago = (request, response) => {
    console.log("@getFormasPago");    
    getCatalogo(QUERY.FORMA_PAGO,response);              
};

const getCatGeneroFamiliar = (request, response) => {
    console.log("@getCatGeneroFamiliar");       
    getCatalogo(QUERY.CAT_GENERO_FAMILIAR,response);
};

const getCatGeneroAlumno = (request, response) => {
    console.log("@getCatGeneroAlumno");       
    getCatalogo(QUERY.CAT_GENERO_ALUMNO,response);
};

/*const getGrupos = (request, response) => {
    console.log("@getGruposPorEmpresa");
    
    const { id_empresa } = request.param;

    getCatalogo(QUERY.GRUPO,response);
};*/
/*
const getServicios = (request, response) => {
    console.log("@getServicios");
    
    const { id_empresa } = request.params;

    getCatalogo(QUERY.SERVICIOS,response);
};*/


module.exports = {
    getCatalogo,
    getFormasPago,
    getCatGeneroFamiliar,    
    getCatGeneroAlumno,    
  //  getServicios
}