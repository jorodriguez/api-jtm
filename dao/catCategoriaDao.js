const genericDao = require("./genericDao");
const {
    ExceptionDatosFaltantes,
    ExceptionBD,
} = require("../exception/exeption");
const { isEmptyOrNull } = require("../utils/Utils");

const getCategorias = async() => {
    console.log("@getCategorias");

    return await genericDao.findAll(
        `              
        select c.id,c.nombre,c.icon, count(e.*) as contador
        from cat_categoria c left join cat_ejercicios e on e.cat_categoria = c.id 
        where c.eliminado = false
        group by c.id
        
      `, []
    );
};

module.exports = { getCategorias };