
-- Script 2 - son modificaciones a datos

update cat_genero set nombre = 'Hombre', foto='https://static.vecteezy.com/system/resources/previews/002/508/442/non_2x/avatar-male-man-portrait-cartoon-character-line-and-fill-style-icon-free-vector.jpg' where id = 4;
update cat_genero set nombre = 'Mujer', foto='https://st3.depositphotos.com/11953928/35426/v/1600/depositphotos_354263092-stock-illustration-avatar-woman-female-character-portrait.jpg' where id = 5;

insert into co_grupo(nombre,color,co_empresa,genero)
values('Diseñadora de imagen profesional','#BF4B7A',3,1),
	 ('Diplomado en Barberia','#BF4B7A',3,1),
	 ('Diplomado en Uñas','#BF4B7A',3,1),
	 ('Diplomado en Maquillaje','#BF4B7A',3,1),
	 ('Diplomado en Cosmetología','#BF4B7A',3,1),
	 ('Diplomado en Colorimetría','#BF4B7A',3,1);


alter table co_alumno add column direccion text;
alter table co_alumno add column telefono text;
alter table co_alumno add column correo text;  
alter table co_alumno add column uid uuid DEFAULT uuid_generate_v4 ()
alter table co_curso add column dias_array integer[];
alter table co_curso add column motivo_baja text;
alter table co_alumno add column originario text;
alter table co_alumno add column ocupacion text;
alter table co_alumno add column tutor text;
alter table co_alumno add column telefono_tutor text;
alter table co_curso add column uid uuid DEFAULT uuid_generate_v4 ()

create table cat_escolaridad(
	id serial not null primary key,
	nombre text not null,
	genero integer not null references usuario(id),
	fecha_genero timestamp default current_timestamp,
	modifico integer references usuario(id),
	fecha_modifico timestamp,
	eliminado boolean default false	
);

alter table co_inscripcion add column confirmado boolean;

alter table co_inscripcion add column fecha_confirmado timestamp;

alter table co_inscripcion add column usuario_confirmo integer references usuario(id);

alter table co_inscripcion add column co_cargo_inscripcion int references co_cargo_balance_alumno(id);
alter table co_cargo_balance_alumno add column co_curso int references co_curso(id);
alter table co_alumno add column total_adeuda numeric default 0;

update cat_cargo set nombre ='Colegiatura' where id  = 1;

alter table co_inscripcion add column co_cargo_inscripcion int references co_cargo_balance_alumno(id);

insert into cat_escolaridad(nombre,genero)
values('Ninguna',1),('Licenciatura',1),('Preparatoria',1),('Secundaria',1);


alter table co_alumno add column cat_escolaridad integer REFERENCES cat_escolaridad(id);



update cat_horario set nombre = 'Vespertino 2-7' where id = 2

update cat_cargo set nombre = 'Colegiatura' where id =1
alter table co_curso drop column cat_dia;

  insert into cat_cargo(nombre,descripcion,precio,notificar,escribir_monto,co_empresa,genero)
  values('Colegiatura Quincenal','Pago quincenal',1,true,true,3,1);

  insert into cat_cargo(nombre,descripcion,precio,notificar,escribir_monto,co_empresa,genero)
  values('Colegiatura Semanal','Pago por semana',1,true,true,3,1);


insert into cat_cargo(nombre,descripcion,precio,notificar,escribir_monto,co_empresa,genero)
  values('Credencial','',1,true,true,3,1);

  insert into cat_cargo(nombre,descripcion,precio,notificar,escribir_monto,co_empresa,genero)
  values('Playera','',1,true,true,3,1);

  insert into cat_cargo(nombre,descripcion,precio,notificar,escribir_monto,co_empresa,genero)
  values('kit de curso','',1,true,true,3,1);