




delete from co_pago_cargo_balance_alumno;

ALTER SEQUENCE co_pago_cargo_balance_alumno_id_seq RESTART WITH 1;


delete from co_cargo_balance_alumno;

ALTER SEQUENCE co_cargo_balance_alumno_id_seq RESTART WITH 1;


delete from cat_cargo where id > 4;

update cat_cargo set nombre = 'Membresia', descripcion='' where id = 1;
update cat_cargo set nombre = 'Membresia',descripcion='' where id = 2;
update cat_cargo set nombre = 'Playera JTM',descripcion='' where id = 3;
update cat_cargo set nombre = 'Kit JTM',descripcion='' where id = 4;


--- limpiar empresa


delete from usuario where co_empresa <> 1;

delete from co_inscripcion;

ALTER SEQUENCE co_inscripcion_id_seq RESTART WITH 1;

delete from co_pago_balance_alumno;

ALTER SEQUENCE co_pago_balance_alumno_id_seq RESTART WITH 1;

delete from co_alumno;

ALTER SEQUENCE co_alumno_id_seq RESTART WITH 1;


delete from co_usuario_notificacion where co_sucursal <> 1; 

delete from si_usuario_sucursal_rol where co_sucursal <> 1; 

delete from co_gasto;

delete from cat_gasto where id <> 1;


delete from co_curso_semanas;

delete from co_curso;

delete from co_usuario_notificacion;

select * from si_usuario_sucursal_rol

delete from  si_usuario_sucursal_rol where usuario > 125;

delete from ve_movimiento;

delete from ve_venta_detalle;

delete from ve_venta;

delete from cat_articulo_sucursal;

delete from cat_articulo;

delete from cat_categoria;

delete from cat_marca;

delete from cat_unidad_medida;


voy aqui

delete from usuario where id > 125;







