
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
