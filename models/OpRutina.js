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

        this.atleta = null;
        this.nombre = "";
        this.fecha_inicio = null;
        this.fecha_fin = null;
        this.publico = false;
        this.numero_semana = 0;
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
    setAtleta(value) {
        this.atleta = value;
        return this;
    }
    setFechaInicio(value) {
        this.fecha_inicio = value;
        return this;
    }
    setFechaFin(value) {
        this.fecha_fin = value;
        return this;
    }
    setPublico(value) {
        this.publico = value;
        return this;
    }
    setNumeroSemana(value) {
        this.numero_semana = value;
        return this;
    }
    setActual(value) {
        this.actual = value;
        return this;
    }

    buildForInsert() {
        return {
            co_empresa: this.co_empresa,
            co_sucursal: this.co_sucursal,
            genero: this.genero,
            nombre: this.nombre,
            atleta: this.atleta,
            fecha_inicio: this.fecha_inicio,
            fecha_fin: this.fecha_fin,
            public: this.publico,
            numero_semana: this.numero_semana,
            actual: this.actual
        };
    }
}

module.exports = CatCliente;