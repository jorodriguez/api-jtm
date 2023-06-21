const genericDao = require('./genericDao');
const { knex } = require('../db/conexion');
const OpRutina = require('../models/OpRutina');
const OpCircuito = require('../models/OpCircuito');
const OpDetalleCircuito = require('../models/OpDetalleCircuito');
const CatEjercicio = require('../models/CatEjercicio');


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


/* Crear la rutina recibe  */

/*

nombre,
atleta,
circuitos [ 
    OpDetalleCircuito { 
            cat_ejercicio,
            cat_unidad_repeticion,
            cat_ejercicios,
            repeticion,
            nombre,
            nota 
        }  
]


*/

const createRutina = async(data = { nombre, atleta, circuitos }) => {

    console.log('@createRutina');

    try {


        const opRutina = Object.assign(new OpRutina(), data);

        const circuitos = data.circuitos;

        let result = null;

        //return await knex("cat_ejercicios").insert(data).returning('*');

        knex.transaction(async(transactionActive) => {

            const opRutinaRecord = await transactionActive("op_rutina")
                .insert(opRutina.buildForInsert())
                .returning('*')

            const rowOpRutina = opRutinaRecord.length > 0 ? opRutinaRecord[0] : null;

            console.log(` OP_RUTINA SAVED ${rowOpCircuito.id} `);

            //guardar los circuitos
            for (let i = 0; i < circuitos.length; i++) {

                const circuitoItem = circuitos[i];

                const opCircuitoModel = Object.assign(new OpCircuito(), circuitoItem);

                opCircuitoModel.setOpRutina(rowOpRutina.id);


                // *** GUARDAR EL CIRCUITO *** //

                const opCircuitoRecord = await transactionActive("op_circuito")
                    .insert(opCircuitoModel.buildForInsert())
                    .build();

                const rowOpCircuito = opCircuitoRecord.length > 0 ? opCircuitoRecord[0] : null;

                console.log(` OP_CIRCUITO SAVED ${rowOpCircuito.id} `);


                // *** GUARDAR EL DETALLE DEL CIRCUITO *** //                

                const detalle = circuitoItem.detalle;

                for (let j = 0; j < detalle.length; j++) {

                    const detalleItem = detalle[j];

                    const opDetalleCircuitoModel = Object.assign(new OpDetalleCircuito(), detalleItem);

                    opDetalleCircuitoModel.setOpCircuito(rowOpCircuito.id);

                    const opDetalleCircuitoRecord = await transactionActive("op_detalle_circuito")
                        .insert(opDetalleCircuitoModel.buildForInsert())
                        .build();

                    const rowOpDetalleCircuito = opDetalleCircuitoRecord.length > 0 ? opDetalleCircuitoRecord[0] : null;

                    console.log(` OP_DETALLE_CIRCUITO SAVED ${rowOpDetalleCircuito.id} `);
                }
            }
            result = opRutinaRecord;
        });

        return result;


    } catch (error) {
        console.log(error)
        return null;
    }
}


/*
const editEjercicio = async(uuid, data) => {
    console.log('@editarEjercicio')

    try {

        return await knex("cat_ejercicios").update({ fecha_modifico: "current_timestamp", ...data }).where({ uuid: uuid }).returning('*');

    } catch (error) {
        console.log(error)
        return false
    }
}*/

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

    const result = await genericDao.eliminarPorId("OP_RUTINA", id, data.genero);

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
    getRutinasSucursal,
    findByRutinaUuid,
    findByUuid,
    createRutina,
    remove
}