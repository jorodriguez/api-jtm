
/*
CREATE TABLE si_adjunto
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),    		
	co_sucursal integer NOT NULL  references co_sucursal(id),    		
	nombre text not null,
	tipo varchar(32),	
	peso varchar(24),
	url text not null,
	uuid UUID not null default uuid_generate_v4(),
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);
*/



CREATE TABLE cat_categoria
(
	id serial NOT NULL primary key,			
	nombre text not null,
	descripcion text,
	uuid UUID not null default uuid_generate_v4(),
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);




CREATE TABLE cat_ejercicios
(
	id serial NOT NULL primary key,	
	co_empresa integer NOT NULL  references co_empresa(id),    		
	co_sucursal integer NOT NULL  references co_sucursal(id),    		
	cat_categoria integer NOT NULL  references cat_categoria(id),    			
	nombre text not null,
	descripcion text,	
	url text not null,
	public_id_imagen text,
	meta_imagen text,
	uuid UUID not null default uuid_generate_v4(),
	fecha_genero timestamp  DEFAULT (getDate('')+getHora('')),
	fecha_modifico timestamp,
	genero integer NOT NULL references usuario(id),
	modifico integer references usuario(id),
	eliminado boolean NOT NULL DEFAULT false    
);


insert into cat_categoria(id,nombre,descripcion,genero)
values(1,'BASIC','Ejercicios basicos',1)


update cat_categoria set nombre = 'GENERAL';

insert into cat_categoria(nombre,descripcion,genero)
values('BICEPS','',1),('TRIBICEPS','',1),('CORE','',1),('ESPALDA ALTA','',1),('ESPALDA','',1);

insert into cat_categoria(nombre,descripcion,genero)
values('ESTIRAMIENTO','',1),('AEROBICO','',1);


alter table cat_ejercicios add column basico boolean default false;
alter table cat_ejercicios add column intermedio boolean default false;
alter table cat_ejercicios add column avanzado boolean default false;

alter table cat_categoria add column icon varchar(32);