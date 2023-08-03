

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



module.exports = {
    guardar,
    getRutinas,
    updateRutina
};

