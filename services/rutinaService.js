const rutinasDao = require('../dao/rutinasDao');
const sucursalDao = require('../dao/sucursalDao');
const CONSTANTES = require('../utils/Constantes');

const crearRutina = async(data) => {

    const { nombre, atleta, circuitos, notificar, co_sucursal, genero } = data;

    let sucursalInfo = await sucursalDao.getSucursalPorId(co_sucursal);

    const rutinaCreated = await rutinasDao.createRutina(data);


    //-- enviar correo de rutina creada
    if (notificar) {

        console.log("ENVIAR CORREO AL ATLETA ");

    }

}


const editar = async(uuid, data) => {

    console.log("editar " + uuid);
}



const remove = async(uuid, data) => {
    console.log("@remove")


    console.log("remove " + uuid);
}


module.exports = {
    getEjerciciosSucursal: rutinasDao.getRutinasSucursal,
    crearRutina,
    editar,
    remove
};