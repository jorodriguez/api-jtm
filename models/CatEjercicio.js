class CatCliente {
    constructor() {
        this.id = null;
        this.co_empresa = null;
        this.co_sucursal = null;
        this.cat_categoria = null;
        this.nombre = "";
        this.descripcion = "";
        this.url = "";
        this.public_id_imagen = "";
        this.meta_imagen = "";
        this.genero = null;
        this.modifico = null;
        this.fecha_genero = null;
        this.fecha_modifico = null;
        this.eliminado = null;
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
    setCatCategoria(catCategoria) {
        this.cat_categoria = catCategoria;
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
    setDescripcion(descripcion) {
        this.descripcion = descripcion;
        return this;
    }
    setPublicIdImagen(value) {
        this.public_id_imagen = value;
        return this;
    }
    setUrl(url) {
        this.url = url;
        return this;
    }
    setMetaImagen(metaImagen) {
        this.meta_imagen = metaImagen;
        return this;
    }
    setEliminado(eliminado) {
        this.eliminado = eliminado;
        return this;
    }

    buildForInsert() {
        return {
            co_empresa: this.co_empresa,
            co_sucursal: this.co_sucursal,
            cat_categoria: this.cat_categoria,
            nombre: this.nombre,
            descripcion: this.descripcion,
            url: this.url,
            public_id_imagen: this.public_id_imagen,
            meta_imagen: this.meta_imagen,
            genero: this.genero
        };
    }
}

module.exports = CatCliente;