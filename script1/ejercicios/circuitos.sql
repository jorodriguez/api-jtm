

CREATE TABLE cat_unidad_repeticion
(
	id serial NOT NULL primary key,			
	nombre text not null,	
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);



CREATE TABLE op_rutina
(
	id serial NOT NULL primary key,				
	co_empresa integer NOT NULL  references co_empresa(id),    		
	co_sucursal integer NOT NULL  references co_sucursal(id),    		
	atleta integer references usuario(id),	/*puede ser publica*/
	nombre text not null,			
	fecha_inicio date,
	fecha_fin date,
	publico boolean default false,	
	numero_semana integer,	
	actual boolean default false,
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);


CREATE TABLE op_circuito
(
	id serial NOT NULL primary key,				
	co_empresa integer NOT NULL  references co_empresa(id),    		
	co_sucursal integer NOT NULL  references co_sucursal(id),    		
	op_rutina integer NOT NULL  references op_rutina(id),    		
	cat_unidad_repeticion integer NOT NULL  references cat_unidad_repeticion(id),    		
	repeticion integer not null default 1,
	nombre text not null,				
	nota text,	
	actual boolean not null default true,
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);




CREATE TABLE op_detalle_circuito
(
	id serial NOT NULL primary key,					
	op_circuito integer NOT NULL  references op_circuito(id),    		
	cat_unidad_repeticion integer NOT NULL  references cat_unidad_repeticion(id),    		
	cat_ejercicios integer NOT NULL  references cat_ejercicios(id),    		
	repeticion integer not null default 1,
	nombre text not null,				
	nota text,	
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);


alter table op_rutina add column uuid UUID not null default uuid_generate_v4();