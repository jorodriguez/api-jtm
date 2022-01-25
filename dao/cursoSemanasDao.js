const genericDao = require("./genericDao");
const {
  ExceptionDatosFaltantes,
  ExceptionBD,
} = require("../exception/exeption");
const { isEmptyOrNull } = require("../utils/Utils");



const guardarCursoSemana = async (semanaData) => {
  console.log("@guardarCursoSemana");    
  try{
	  
    const {
      co_curso,
      co_materia_modulo_especialidad,
      co_modulo_especialidad,
      numero_semana_curso,
      numero_semana_anio,
      fecha_inicio_semana,
      fecha_fin_semana,
      fecha_clase,
      anio,      
      genero    
    } = semanaData;
    
    return await genericDao.execute(`
          insert into co_curso_semanas(
            co_curso,
            co_materia_modulo_especialidad,
            co_modulo_especialidad,
            numero_semana_curso,
            numero_semana_anio,
            fecha_inicio_semana,
            fecha_fin_semana,
            fecha_clase,
            anio,            
            genero)
          values($1,$2,$3,$4,$5,$6::date,$7::date,$8::date,$9,$10) RETURNING ID;
    `,[ co_curso,
      co_materia_modulo_especialidad,
      co_modulo_especialidad,
      numero_semana_curso,
      numero_semana_anio,
      fecha_inicio_semana,
      fecha_fin_semana,
      fecha_clase,
      anio,      
      genero    ]);      

  }catch(e){  
    console.log("Error al insertar la semana del curso "+e);
    throw new ExceptionBD("Error");
  }
};



const modificarCursoSemana = async (semanaData) => {
  console.log("@modificarCursoSemana");    
  try{
	  
    const {
      id,            
      numero_semana_curso,
      numero_semana_anio,
      fecha_inicio_semana,
      fecha_fin_semana,
      fecha_clase,
      anio,      
      genero    
    } = semanaData;
    
    return await genericDao.execute(`
         UPDATE CO_CURSO_SEMANAS
         SET 
              numero_semana_curso = $2,
              numero_semana_anio= $3,
              fecha_inicio_semana = $4::date,
              fecha_fin_semana = $5::date,
              fecha_clase = $6::date,
              anio = $7, 
              fecha_modifico=(getDate('')+getHora(''))::timestamp,
              genero = $8
         WHERE ID = $1 
         RETURNING ID;                    
    `,[id, 
      numero_semana_curso,
      numero_semana_anio,
      fecha_inicio_semana,
      fecha_fin_semana,
      fecha_clase,
      anio,      
      genero    ]);      

  }catch(e){  
    console.log("Error al modificar la semana del curso "+e);
    throw new ExceptionBD("Error");
  }
};

const guardarRealcionCargoCursoSemana = async (idCursoSemana,idCargo,genero) => {
  console.log("@guardarRealcionCargoCursoSemana");    
  try{	  
        
    return await genericDao.execute(`
          UPDATE co_curso_semanas
          SET co_cargo_balance_alumno = $2,
              fecha_modifico = (getDate('')+getHora(''))::timestamp,
              modifico = $3
          WHERE ID = $1
          RETURNING ID;
    `,[idCursoSemana,idCargo,genero]);      

  }catch(e){  
    console.log("Error al modificar la relacion cargo "+e);
    throw new ExceptionBD("Error");
  }
};



const getSeriesPeriodosCurso = (uidCurso) => {    
  return genericDao.findAll(getQueryBaseSeries(), [uidCurso]);
}

const getSemanasCursoRecalculados = (uidCurso) =>{

  return genericDao.findAll(`
  with periodo as(     		
    select c.id as id_curso,fecha_inicio_previsto::date,fecha_fin_previsto::date,e.duracion,d.equivalencia,d.nombre as periodo
        from co_curso c inner join cat_especialidad e on e.id = c.cat_especialidad
                inner join cat_duracion d on d.id = e.cat_duracion
    where c.uid = $1 and c.eliminado = false      
  ), materias as(
  SELECT 
    curso_semana.id,	
    curso_semana.numero_semana_curso,	
    date_trunc('week', ((p.fecha_inicio_previsto + ((curso_semana.numero_semana_curso - 1) ||' week')::interval)))::date as fecha_inicio_semana,
    (date_trunc('week', ((p.fecha_inicio_previsto + ((curso_semana.numero_semana_curso - 1) ||' week')::interval)))::date + interval '6 days')::date as fecha_fin_semana,
    p.id_curso,
    to_char(((p.fecha_inicio_previsto + ((curso_semana.numero_semana_curso - 1) ||' week')::interval))::date,'DD-MM-YYYY') as fecha_clase_format,
    ((p.fecha_inicio_previsto + ((curso_semana.numero_semana_curso - 1) ||' week')::interval))::date as fecha_clase,	
    p.equivalencia     
  FROM co_curso_semanas curso_semana  inner join periodo p on p.id_curso = curso_semana.co_curso
  where curso_semana.eliminado = false
  ) select m.*,
      extract(week from m.fecha_clase::date)::int as numero_semana_anio,
      extract(year from m.fecha_clase::date)::int as numero_anio 	 	
  from materias m 

  `,[uidCurso]);

}

const getSemanasCurso = (uidCurso) => {    
  return genericDao.findAll(getQueryBaseSemanasCurso(" curso.uid = $1 "), [uidCurso]);
}

const getSemanaCursoById = (idSemanaCurso)=>{
  return genericDao.findOne(`
  select sem.*,modulo.nombre as modulo,materia.nombre as materia_modulo,especialidad.nombre as especialidad
  from 
  co_curso_semanas sem inner join co_curso curso on curso.id = sem.co_curso
    inner join cat_especialidad especialidad on especialidad.id = curso.cat_especialidad
    inner join co_materia_modulo_especialidad materia on materia.id = sem.co_materia_modulo_especialidad
    inner join co_modulo_especialidad modulo on modulo.id = sem.co_modulo_especialidad
  where sem.id = $1
      and sem.eliminado = false
  `,[idSemanaCurso]);
}


const getSemanaActualCurso = (idCurso)=>{
  return genericDao.findOne(`
      select * 
      from co_curso_semanas
      where co_curso = $1
          and numero_semana_anio =  extract(week from getDate(''))::int 
          and anio = extract(year from getDate(''))::int
          and eliminado = false
  `,[idCurso]);
}

//es para el proceso automatico de generacion de colegiaturas
/*const getInformacionCrearColegiaturaSemanaActual = ()=>{
  return genericDao.findAll(`
  select	c.id as id_semana_actual,
  c.co_curso,
  c.numero_semana_curso,      		
  inscripcion.co_alumno,
  al.nombre||' '||al.apellidos  as alumno,
  inscripcion.* 
from co_curso_semanas c inner join co_inscripcion inscripcion on inscripcion.co_curso = c.co_curso
        inner join co_alumno al on al.id = inscripcion.co_alumno
        inner join co_curso curso on curso.id = inscripcion.co_curso
where       	
  c.numero_semana_anio =  extract(week from getDate(''))::int 
  and c.fecha_clase = getDate('')
  and c.anio = extract(year from getDate(''))::int
  and c.eliminado = false
  and inscripcion.eliminado = false
  and al.eliminado = false
  and curso.eliminado = false

  `,[]);
}*/
const getInformacionCrearColegiaturaSemanaActual = ()=>{
  return genericDao.findAll(`
    select	
	      c.id as id_semana_actual,
  	    c.co_curso,
  	    c.numero_semana_curso,      		  	  	
      	array_to_json(array_agg(row_to_json((inscripcion.*)))) array_inscripciones,
  	    count(inscripcion.*) as contador_inscripciones
    from co_curso_semanas c inner join co_curso curso on curso.id = c.co_curso
		    		  	inner join co_inscripcion inscripcion on inscripcion.co_curso = c.co_curso
            				inner join co_alumno al on al.id = inscripcion.co_alumno        
    where       	  
      c.fecha_clase = getDate('')
      and c.eliminado = false
      and inscripcion.eliminado = false
      and al.eliminado = false
      and curso.eliminado = false
      group by c.id,c.co_curso,c.numero_semana_curso

  `,[]);
}

const getQueryBaseSemanasCurso = (criterio)=>`
select sem.id, 
		  curso.id as id_curso,
		  especialidad.nombre as especialidad,
		  materia.id as id_materia_modulo_especialidad,
		  materia.nombre as materia_modulo_especialidad,
		  modulo.id as id_modulo_especialidad,
		  modulo.nombre as modulo_especialidad,
		  sem.numero_semana_anio,
		  sem.numero_semana_curso,
      sem.fecha_inicio_semana,
		  to_char(sem.fecha_inicio_semana,'DD-MM-YYYY') as fecha_inicio_semana_format,
		  sem.fecha_fin_semana,
      to_char(sem.fecha_fin_semana,'DD-MM-YYYY') as fecha_fin_semana_format,
		  to_char(sem.fecha_clase,'DD-MM-YYYY') as fecha_clase_format,
		  sem.anio,
		  (sem.numero_semana_anio < extract(week from getDate(''))::int) as semana_ocurrida,
		  (sem.numero_semana_anio = extract(week from getDate(''))::int) as semana_actual,
      bal.id is not null as tiene_cargo
	from co_curso_semanas sem inner join co_curso curso on curso.id = sem.co_curso
						inner join cat_especialidad especialidad on especialidad.id = curso.cat_especialidad
						inner join co_materia_modulo_especialidad materia on materia.id = sem.co_materia_modulo_especialidad
						inner join co_modulo_especialidad modulo on modulo.id = sem.co_modulo_especialidad
            left join co_cargo_balance_alumno bal on bal.id = sem.co_cargo_balance_alumno
	where  ${criterio ? criterio+' and ':''} 
		      curso.eliminado = false

`;

const getQueryBaseSeries = ()=>`
with periodo as(     
  select c.id as id_curso,e.id as cat_especialidad,fecha_inicio_previsto::date,fecha_fin_previsto::date,e.duracion,d.equivalencia,d.nombre as periodo
  from co_curso c inner join cat_especialidad e on e.id = c.cat_especialidad
               inner join cat_duracion d on d.id = e.cat_duracion
  where c.uid = $1 and c.eliminado = false      
), materias as(
SELECT 
ROW_NUMBER () OVER (ORDER BY m.id) as numero_semana_curso,
m.id as co_materia_modulo_especialidad,
m.nombre as materia_modulo_especialidad,
esp.id as co_modulo_especialidad,
esp.nombre as modulo_especialidad,
to_char(p.fecha_inicio_previsto,'YYYY-MM-DD')::text as fecha_inicio_previsto,
to_char(p.fecha_fin_previsto,'YYYY-MM-DD')::text as fecha_fin_previsto,	
p.id_curso,
to_char((p.fecha_inicio_previsto + (ROW_NUMBER() OVER (ORDER BY m.id) -1 ||' week')::interval)::date,'DD-MM-YYYY') as fecha_clase_format, 	
((p.fecha_inicio_previsto + (ROW_NUMBER() OVER (ORDER BY m.id) -1 ||' week')::interval)::date)::text as fecha_clase, 	
p.equivalencia     
FROM co_materia_modulo_especialidad m inner join co_modulo_especialidad esp on esp.id = m.co_modulo_especialidad
               inner join periodo p on p.cat_especialidad = esp.cat_especialidad
) select m.*,
    extract(week from m.fecha_clase::date)::int as numero_semana_anio,
    extract(year from m.fecha_clase::date)::int as numero_anio 	 	
from materias m`;



module.exports = {
  guardarCursoSemana,
  modificarCursoSemana,
  getSemanasCursoRecalculados,
  getSeriesPeriodosCurso,
  getSemanaActualCurso,
  getSemanasCurso,
  getSemanaCursoById,
  guardarRealcionCargoCursoSemana,
  getInformacionCrearColegiaturaSemanaActual
};
