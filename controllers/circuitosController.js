
const handle = require('../helpers/handlersErrors');

const {getRutinas, guardar, updateRutina, disableRutina} = require('../services/circuitosService');

const guardarCircuitos = async (request, response) => {
    try {

        const {rutina} = request.body;

        if (rutina === undefined) {
            return response.status(200).json({message:'La rutina es obligatoria'})
        }

        const res = await guardar(rutina);

        if (res) {
           return  response.status(200).json({data:res, success:true})
        } else {
            return  response.status(200).json({message:'Error al guardar la info', success:false})
        }
         
    } catch (e) {
        handle.callbackErrorNoControlado(e, response);

        return  response.status(200).json({message:'Error al guardar la info', success:false})
    }
};

const getRutinasUser = async (request, response) => {
    try {

        const {id_user} = request.params

        if (id_user === undefined) {
            return response.status(200).json({message:'El id es obligatorio'})
        }

        const res = await getRutinas(id_user)

        if (res) {
           return  response.status(200).json({data: res})
        }

    } catch (e) {
        handle.callbackErrorNoControlado(e, response);
    }
};


const actualizarRutina = async (request, response) => {
    try {

        const {id_rutina} = request.params
        const {circuitos} = request.body

        if (id_rutina === undefined) {
            return response.status(200).json({message:'El id es obligatorio'})
        }

        const res = await updateRutina(id_rutina, circuitos)

        if (res) {
           return  response.status(200).json({data: res, success:true})
        } else {
            return  response.status(200).json({message: 'No existe un elemento con el id proporcionado', success:false})
        }

    } catch (e) {
        handle.callbackErrorNoControlado(e, response);
    }
};

const desactivarRutina = async (request, response) => {
    console.log(request)
    try {
        const {id_rutina} = request.params;

        if (id_rutina === undefined) {
            return response.status(200).json({message:'El id es obligatorio'})
        }

        const res = await disableRutina(id_rutina);

        if (res) {
            return  response.status(200).json({message:'Desactivado con exito', success:true})
         } else {
             return  response.status(200).json({message: 'No existe un elemento con el id proporcionado', success:false})
         } 
    } catch (error) {
        handle.callbackErrorNoControlado(e, response);
    }
}

module.exports = {
    guardarCircuitos,
    getRutinasUser,
    actualizarRutina,
    desactivarRutina
};