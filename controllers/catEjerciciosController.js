const handle = require('../helpers/handlersErrors');

const catEjericiosService = require('../services/catEjericiosService');

const getEjerciciosSucursal = async(request, response) => {
    console.log("@getEjerciciosSucursal");
    try {

        const results = await catEjericiosService.getEjerciciosSucursal();

        response.status(200).json(results);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};


/*
 body: [Object: null prototype] {
    name: 'image',
    co_sucursal: '1',
    co_empresa: 'undefined',
    co_categoria: '1',
    genero: '10'
  },
  file: {
    fieldname: 'image',
    originalname: '20944201.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 96 00 96 00 00 ff ed 03 d0 50 68 6f 74 6f 73 68 6f 70 20 33 2e 30 00 38 42 49 4d 03 ed 00 00 00 00 00 10 ... 1049488 more bytes>,
    size: 1049538
  },
*/
const create = async(request, response) => {
    console.log("@create");
    try {

        //console.log(request)

        const data = { co_sucursal, cat_categoria, co_empresa, genero } = request.body;

        const image = request.file.buffer;

        const results = await catEjericiosService.guardar({ image, ...data })

        response.status(200).json(results);

    } catch (e) {
        console.log(e);
        handle.callbackErrorNoControlado(e, response);
    }
};



module.exports = {
    getEjerciciosSucursal,
    create
};