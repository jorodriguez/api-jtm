const catEjerciciosDao = require('../dao/catEjerciciosDao');
const uploadService = require('./uploadService');
const sucursalDao = require('../dao/sucursalDao');
const CONSTANTES = require('../utils/Constantes');
const CatEjercicio = require('../models/CatEjercicio')

const guardar = async(data) => {

    const { co_empresa, co_sucursal, cat_categoria, nombre, descripcion, genero } = data;

    let nombreFolderCategoria = cat_categoria;

    let sucursalInfo = await sucursalDao.getSucursalPorId(co_sucursal);

    const ruta = `${sucursalInfo.folder_empresa}/${sucursalInfo.folder_sucursal}/${CONSTANTES.FOLDER_EJERICIOS_CLOUDNARY}/${nombreFolderCategoria}`;

    //console.log(`RUTA -> ${ruta}`);

    console.log(`RUTA -> ${data}`);

    //guardar la imagen y actualizar
    const meta_imagen = await uploadService.uploadFile(data.image, ruta);

    //console.log(`META ${JSON.stringify(meta_imagen)}`);

    delete data.name;

    const catEjercicio = new CatEjercicio()
        .setCoEmpresa(co_empresa)
        .setCoSucursal(co_sucursal)
        .setCatCategoria(cat_categoria)
        .setNombre(nombre)
        .setDescripcion(descripcion)
        .setGenero(genero)
        .setUrl(meta_imagen.secure_url)
        .setPublicIdImagen(meta_imagen.public_id)
        .setMetaImagen(meta_imagen)
        .buildForInsert();

    //crear el registro
    const catEjercicioNuevo = await catEjerciciosDao.createEjercicio(catEjercicio);

    console.log(catEjercicioNuevo)


}


module.exports = {
    getEjerciciosSucursal: catEjerciciosDao.getEjerciciosSucursal,
    guardar
};