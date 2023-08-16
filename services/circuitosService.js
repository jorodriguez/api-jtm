

const circuitoDao = require('../dao/circuitoDao')

const guardar = async (rutina)=>{
    return await circuitoDao.saveData(rutina)
};


const getRutinas = (user_id) => {
    const res = circuitoDao.getRutinasUser(user_id);
    return res;
}

const updateRutina = (rutina_id, circuitos) => {
    const res = circuitoDao.updateData(rutina_id, circuitos);

    return res;
}

const disableRutina = (rutina_id) => {
    return circuitoDao.disableRutina(rutina_id);
}



module.exports = {
    guardar,
    getRutinas,
    updateRutina,
    disableRutina
};

