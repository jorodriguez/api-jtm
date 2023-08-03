const { knex } = require('../db/conexion');
const { getQueryInstance } = require('../controllers/sqlHelper');

const saveData = async (rutina) => {
  const { nombre, atleta, co_empresa, co_sucursal, numero_semana, circuitos } = rutina;
  return new Promise((resolve, reject) => {
    knex.transaction(function (trx) {
      const dataCircuitos = circuitos.map((item) => {
        return {
          ejercicios: item.map(e => {
            return {
              ...e
            }
          }),
          co_empresa,
          co_sucursal,
          atleta
        }
      });

      return trx
        .insert({
          co_empresa,
          co_sucursal,
          atleta,
          nombre,
          numero_semana,
          actual: true,
          genero: atleta,
        }, 'id')
        .into('op_rutina')
        .then(function (ids) {
          const op_rutina_id = ids[0]; // Obtenemos el id generado para op_rutina
          const { id: id_rutina } = op_rutina_id;
          dataCircuitos.forEach((item) => item.op_rutina = id_rutina); // Asignamos el id de op_rutina a las filas de op_circuito
          const saveCircuitos = dataCircuitos.map((item) => {
            return {
              co_empresa: item.co_empresa,
              co_sucursal: item.co_sucursal,
              op_rutina: item.op_rutina,
              genero: atleta
            }
          });

          return trx('op_circuito')
            .insert(saveCircuitos)
            .returning('id') // Retornar los IDs de los op_circuito insertados
            .then(function (opCircuitoIds) {
              console.log(opCircuitoIds, 'probando ids')
              const opDetalleCircuitoData = [];
              opCircuitoIds.forEach((opCircuitoId, index) => {
                const ejercicios = dataCircuitos[index].ejercicios;
                ejercicios.forEach((ejercicio) => {
                  opDetalleCircuitoData.push({
                    op_circuito: opCircuitoId.id,
                    cat_unidad_repeticion: ejercicio.cat_unidad_repeticion,
                    repeticion: ejercicio.repeticiones,
                    cat_ejercicios: ejercicio.id,
                    nombre: ejercicio.nombre,
                    nota: ejercicio.nota,
                    genero: atleta
                  });
                });
              });
              return trx('op_detalle_circuito').insert(opDetalleCircuitoData);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
      .then(function (inserts) {
        console.log(inserts, 'probando inserts')
        resolve(true)
      })
      .catch(function (error) {
        console.error(error, 'hay error');
        reject(error)
      });
  })
};

const getRutinasUser = async (user_id) => {
  const response = await getQueryInstance(
    `
        SELECT 
          rutina.*,
          (
            SELECT json_agg(circuitos)
            FROM (
              SELECT 
                oc.*,
                (
                  SELECT json_agg(odc)
                  FROM op_detalle_circuito odc
                  WHERE odc.op_circuito = oc.id
                ) as detalle_circuito
              FROM op_circuito oc
              WHERE oc.op_rutina = rutina.id
            ) as circuitos
          ) circuitos
        FROM op_rutina rutina
        WHERE rutina.atleta = ${user_id}
        AND rutina.actual = true
         GROUP BY rutina.id;`);

  const { rows } = response;

  return rows.length > 0 ? rows : [];
};

const updateData = async (rutina_id, circuitos) => {
  return new Promise(async (resolve, reject) => {
    try {
      await knex.transaction(async function (trx) {
        const rutina = await knex('op_rutina').select().where({ id: rutina_id }).first();
  
        if (rutina) {
          for (const item of circuitos) {
            for (const element of item.detalle_circuito) {
              await trx('op_detalle_circuito').where('op_circuito', element.id).del();
            }
          }
        }
      });
  
      console.log('Datos eliminados exitosamente');
       resolve(true);
    } catch (error) {
      console.error('Error al eliminar datos:', error);
      throw error;
    }
  })
}


module.exports = {
  saveData,
  getRutinasUser,
  updateData
}