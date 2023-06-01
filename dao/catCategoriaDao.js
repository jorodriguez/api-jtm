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
      select *
      from cat_categoria
      where eliminado = false      
      `, []
    );
};

module.exports = { getCategorias };