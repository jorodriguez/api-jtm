class CatCliente {
    constructor() {
        this.id = null;
        this.co_empresa = null;
        this.co_sucursal = null;
        this.genero = null;
        this.modifico = null;
        this.fecha_genero = null;
        this.fecha_modifico = null;
        this.eliminado = null;

        this.op_rutina = null;
        this.cat_unidad_repeticion = null;
        this.nombre = "";
        this.actual = true;
        this.repeticion = 1;
        this.nota = "";
        this.actual = true;

    }
    setId(id) {
        this.id = id;
        return this;
    }
    setCoEmpresa(coEmpresa) {
        this.co_empresa = coEmpresa;
        return this;
    }
    setCoSucursal(coSucursal) {
        this.co_sucursal = coSucursal;
        return this;
    }
    setGenero(genero) {
        this.genero = genero;
        return this;
    }
    setModifico(modifico) {
        this.modifico = modifico;
        return this;
    }
    setFechaGenero(fechaGenero) {
        this.fecha_genero = fechaGenero;
        return this;
    }
    setFechaModifico(fechaModifico) {
        this.fecha_modifico = fechaModifico;
        return this;
    }

    setNombre(nombre) {
        this.nombre = nombre;
        return this;
    }
    setEliminado(eliminado) {
        this.eliminado = eliminado;
        return this;
    }
    setOpRutina(value) {
        this.op_rutina = value;
        return this;
    }
    setCatUnidadRepeticion(value) {
        this.cat_unidad_repeticion = value;
        return this;
    }
    setActual(value) {
        this.actual = value;
        return this;
    }

    buildforInsert() {
        return {
            co_empresa: this.co_empresa,
            co_sucursal: this.co_sucursal,
            genero: this.genero,
            nombre: this.nombre,
            numero_semana: this.numero_semana,
            actual: this.actual,
            op_rutina: this.op_rutina,
            cat_unidad_repeticion: this.cat_unidad_repeticion,
            repeticion: this.repeticion,
            nota: this.nota,
        };
    }
}

module.exports = CatCliente;