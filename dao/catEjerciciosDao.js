const genericDao = require('./genericDao');
const { knex } = require('../db/conexion');
const CatEjercicio = require('../models/CatEjercicio')


const getEjerciciosSucursal = async(coSucursal) => {
    console.log('@getEjerciciosSucursal')
    return await genericDao.findAll(queryBase(` suc.id = $1 `), [coSucursal])
}

const findEjercicioUuid = async(coSucursal, uuid) => {
    console.log('@findEjercicioUuid')

    return await genericDao.findOne(
        queryBase(` e.uuid = $2  and suc.id = $1 `), [coSucursal, uuid],
    );
}

const findByUuid = async(uuid) => {
    console.log('@findByUuid')
    return await genericDao.findOne(
        queryBase(` e.uuid = $1   `), [uuid],
    );
}

const getEjercicioPorNombre = async(coSucursal, nombre) => {

    console.log('@getEjercicioPorNombre')
    return await genericDao.findAll(
        queryBase(` lower(a.nombre) like lower('%${nombre}%')  and suc.id = $1 `), [coSucursal],
    );
}

const getEjerciciosPorCategoria = async(coSucursal, catCategoria) => {
    console.log('@getEjerciciosPorCategoria')
    return await genericDao.findAll(queryBase(` cat.id = $2 and suc.id = $1 `), [
        coSucursal,
        catCategoria,
    ])
}


const createEjercicio = async(data) => {
    console.log('@createEjercicio')

    try {

        // const articuloData = Object.assign(new CatEjercicio(), data);

        console.log(JSON.stringify(data));

        return await knex("cat_ejercicios").insert(data).returning('*');


        /*knex.transaction(async(transactionActive) => {

            const resultsArticulo = await transactionActive(Tables.CAT_ARTICULO)
                .insert(articuloData.buildForInsert())
                .returning('*')

            const rowArticulo = resultsArticulo.length > 0 ? resultsArticulo[0] : null

            const dataInsertArticuloSucursal = articuloSucursalData
                .setCatArticulo(rowArticulo.id)
                .build()
            
            await transactionActive(Tables.CAT_ARTICULO_SUCURSAL)
                .insert(dataInsertArticuloSucursal)
                .returning('*')
            console.log('Articulo agregado')
        });*/


    } catch (error) {
        console.log(error)
        return false
    }
}



const editEjercicio = async(uuid, data) => {
    console.log('@editarEjercicio')

    try {

        return await knex("cat_ejercicios").update({ fecha_modifico: "current_timestamp", ...data }).where({ uuid: uuid }).returning('*');

    } catch (error) {
        console.log(error)
        return false
    }
}

/*
const updateArticulo = async(id, data) => {
    console.log('@updateArticulo')

    const articuloData = Object.assign(new CatArticulo(), data)
    const articuloSucursalData = Object.assign(new CatArticuloSucursal(), data)

    //actualizar el catalogo  - no de modifica el codigo
    const dataArticuloWillUpdate = articuloData
        .setFechaModifico(new Date())
        .setModifico(data.genero)
        .buildForUpdate()

    const catArticulo = await articuloDao.update(id, dataArticuloWillUpdate)

    //  actualizar los demas campos
    const dataArticuloSucursalWillUpdate = articuloSucursalData
        .setFechaModifico(new Date())
        .setModifico(data.genero)
        .buildForUpdate()

    const catArticuloSucursal = await articuloSucursalDao.update(
        id,
        dataArticuloSucursalWillUpdate,
    )

    return { catArticulo, catArticuloSucursal }
}
*/

const remove = async(id, data) => {
    console.log('@delete')

    const result = await genericDao.eliminarPorId("CAT_EJERCICIOS", id, data.genero);

    return result;
}


const queryBase = (criterio) => `
select e.id,
	  suc.nombre as sucursal,
      cat.id as cat_categoria,
	  cat.nombre as categoria,
	  e.nombre,
	  e.descripcion,
	  e.url,
	  e.public_id_imagen,
	  e.uuid,
      e.basico,
      e.intermedio,
      e.avanzado,
      '' as nota,
      1 as repeticiones,
      1 as cat_unidad_repeticion,
      false as show,
      false as seleccionado	  
from cat_ejercicios e inner join co_sucursal suc on suc.id = e.co_sucursal
				  inner join cat_categoria cat on cat.id = e.cat_categoria
where  ${criterio ? criterio : ''} 
      ${criterio ? ' and ' : ''}      
      e.eliminado = false
order by e.fecha_genero desc
`

module.exports = {
    getEjercicioPorNombre,
    getEjerciciosSucursal,
    findEjercicioUuid,
    getEjerciciosPorCategoria,
    findByUuid,
    createEjercicio,
    editEjercicio,
    remove
}