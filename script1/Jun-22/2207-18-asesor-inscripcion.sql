alter table usuario add column visible_catalogo boolean default true;

update usuario set visible_catalogo = false where id in (125,131)

update si_rol set eliminado = true where id in (5)

update si_rol set nombre = 'ASESOR-INSCRIPCIONES' where id = 4


alter table si_rol add column descripcion text;

update si_rol set descripcion = 'Tiene acceso a todas las opciones.' where id = 1;

update usuario set visible_catalogo = false where id in (1,125)

delete from si_usuario_sucursal_rol where eliminado = true;

alter table co_template add column template_correo_registro_usuario text;


update co_template set template_correo_registro_usuario = '
<table width="100%" border="0" style="padding-top:10px" cellspacing="0" cellpadding="0">
    <tr>
        <td class="bodycopy">         
			<p>
            	Hola <strong>{{nombre}}</strong>,           
            </p>
            <p>
            	Te damos la bienvenida a nuestra institución.
            </p>                        
            <p>
            	tu contraseña de acceso es : <strong>{{clave}}</strong>
            </p>
            <br/>            
            <p>
            	<a href="https://admin-paris.herokuapp.com"> da click aqui para abrir el sistema</a>
            </p>
            
        </td>
    </tr>
</table>
</td>
</tr>          
</table>
<br/>
<p>* Por favor no compartas tu clave con nadie.</p>
';


alter table co_inscripcion add column usuario_inscribe integer references usuario(id);


insert into si_rol(id,si_modulo,nombre,genero)
values(8,1,'ADMINISTRADOR',1)

--suc mty
insert into si_rol_opcion(si_rol,si_opcion,genero)
values(8,1,1),(8,3,1),(125,1,8,1,1)

--suc apo
insert into si_usuario_sucursal_rol(usuario,co_sucursal,si_rol,co_empresa,genero)
values(125,2,8,1,1),(125,2,3,1,1)



--suc cecan
insert into si_usuario_sucursal_rol(usuario,co_sucursal,si_rol,co_empresa,genero)
values(134,6,8,3,1),(134,6,3,3,1)



update si_opcion set eliminado = false where id in (1,3)

update si_rol set eliminado = true where id = 3


alter table si_rol add column ordenacion integer default 0;

update si_rol set descripcion = 'Acceso a Cobranza,Inscripciones, Catalogo de Talleres, Registro de Gastos y Corte', ordenacion=1 where id = 1;

update si_rol set descripcion = 'Acceso a Cobranza,Catalogo de Talleres, Registro de Gastos y Corte', ordenacion=2 where id = 2;

update si_rol set descripcion = 'Acceso solo a Incripciones', ordenacion = 3 where id = 4;

update si_rol set descripcion = 'Acceso solo a la Terminal de Ventas',ordenacion = 4 where id = 6;

update si_rol set descripcion = 'Acceso solo al Catalogo de Productos y Consulta de Ventas', ordenacion = 5 where id = 7;

update si_rol set descripcion = 'Acceso solo a la Administración',ordenacion = 6 where id = 8;


update si_opcion set icono_menu = 'fa fa-cog' where id = 1


update co_inscripcion set usuario_inscribe = genero where co_sucursal <> 1;

update co_inscripcion set usuario_inscribe = 130 where co_sucursal = 1;