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

        this.cat_unidad_repeticion = null;
        this.cat_ejercicios = null;
        this.repeticion = 1;
        this.nombre = "";
        this.nota = "";
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
    setCatUnidadRepeticion(value) {
        this.cat_unidad_repeticion = value;
        return this;
    }
    setCatEjercicios(value) {
        this.cat_ejercicios = value;
        return this;
    }
    setRepeticion(value) {
        this.repeticion = value;
        return this;
    }
    setNota(value) {
        this.nota = value;
        return this;
    }


    build() {
        return {
            id: this.id,
            co_empresa: this.co_empresa,
            co_sucursal: this.co_sucursal,
            genero: this.genero,
            modifico: this.modifico,
            fecha_genero: this.fecha_genero,
            fecha_modifico: this.fecha_modifico,
            nombre: this.nombre,
            cat_unidad_repeticion: this.cat_unidad_repeticion,
            cat_ejercicios: this.cat_ejercicios,
            repeticion: this.repeticion,
            nota: this.nota,
        };
    }
}

module.exports = CatCliente;