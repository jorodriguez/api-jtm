const handle = require('../helpers/handlersErrors');
const rutinaService = require('../services/rutinaService');

const createRutina = async(request, response) => {
    console.log("@createRutina");
    try {

        const data = request.body;

        const results = await rutinaService.crearRutina(data);

        response.status(200).json(results);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


const edit = async(request, response) => {
    console.log("@edit");
    try {

        console.log(request.body)

        const uuid = request.params.uuid;

        const data = request.body;

        const results = await rutinaService.editar(uuid, data);

        response.status(200).json(results);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};

const remove = async(request, response) => {
    console.log("@delete");
    try {

        const uuid = request.params.uuid;

        const data = request.body;

        const results = await catEjericiosService.remove(uuid, data);

        response.status(200).json(results);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};







module.exports = {
    getRutinasSucursal: rutinaService.getEjerciciosSucursal,
    createRutina,
    edit,
    remove
};