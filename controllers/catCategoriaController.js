const handle = require('../helpers/handlersErrors');

const catCategoriaService = require('../services/catCategoriaService');

const getCategorias = async(request, response) => {
    console.log("@getCategorias");
    try {

        const results = await catCategoriaService.getCategorias();

        response.status(200).json(results);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


module.exports = {
    getCategorias
};