const genericDao = require('./genericDao');
const { knex } = require('../db/conexion');
const CatEjercicio = require('../models/CatEjercicio')


const getRutinasSucursal = async(coSucursal) => {
    console.log('@getRutinasSucursal')
    return await genericDao.findAll(queryRutinaBase(` suc.id = $1 `), [coSucursal])
}

const findByRutinaUuid = async(coSucursal, uuid) => {
    console.log('@findByRutinaUuid')

    return await genericDao.findOne(
        queryBase(` r.uuid = $2  and suc.id = $1 `), [coSucursal, uuid],
    );
}

const findByUuid = async(uuid) => {
    console.log('@findByUuid')
    return await genericDao.findOne(
        queryBase(` r.uuid = $1   `), [uuid],
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


const queryRutinaBase = (criterio, order) => `

select r.id, 
	  r.atleta, 
	  r.nombre,
	  r.numero_semana, 
	  r.fecha_inicio,
	  u.nombre as nombre_atleta,
	  (select count(*) from op_circuito where eliminado = false and op_rutina = r.id) as numero_circuitos
from op_rutina r inner join usuario u on r.atleta = u.id
        inner join co_sucursla suc in suc.id = r.co_sucursal
where 
      ${criterio ? criterio : ''} 
      ${criterio ? ' and ' : ''}      	
	and r.eliminado = false 
${order ? order : ''} 
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