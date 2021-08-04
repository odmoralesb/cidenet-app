import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Acciones
import {
    updateInputs,
    getPaises,
    getTipoIdentificaciones,
    getCorreosSimilares,
    getEmpleado,
    limpiar
} from '../actions/empleado';

class Empleado extends Component {
    componentWillMount() {
        this.props.getPaises();
        this.props.getTipoIdentificaciones();
        if (this.props.id) {
            this.props.getEmpleado(this.props.id);
        }
    }

    setCorreo = (primer_nombre, primer_apellido, pais) => {
        let apellido = primer_apellido.split(' ');

        const correos_similares = this.props.correos_similares
            .toJS()
            .map((x) => {
                return x.split('@')[0];
            })
            .sort()
            .reverse();

        let id = '';
        if (correos_similares.length > 0) {
            let primer_correo = correos_similares[0];
            const separacion = primer_correo.split('.');
            if (separacion.length <= 2) {
                id = '.1';
            } else {
                id = separacion[2];
                const nid = parseInt(id) ? parseInt(id) + 1 : 1;
                id = '.' + nid;
            }
        }

        if (apellido.length === 2) {
            apellido = `${apellido[0]}${apellido[1]}`;
        } else if (apellido.length > 2) {
            apellido = `${apellido[0]}${apellido[1]}${apellido[2]}`;
        } else {
            apellido = apellido[0];
        }

        const dominio =
            pais.toUpperCase() === 'COLOMBIA'
                ? 'cidenet.com.co'
                : 'cidenet.com.us';

        this.props.updateInputs(
            'info.correo',
            `${primer_nombre}.${apellido}${id}@${dominio}`
        );
    };

    componentWillReceiveProps(nextProps) {
        const empleado_current = this.props.info.toJS();
        const empleado_next = nextProps.info.toJS();

        if (
            empleado_current.primer_nombre != empleado_next.primer_nombre ||
            empleado_current.primer_apellido != empleado_next.primer_apellido ||
            empleado_current.pais != empleado_next.pais
        ) {
            this.props.getCorreosSimilares();
            if (
                empleado_next.primer_nombre &&
                empleado_next.primer_apellido &&
                empleado_next.pais
            ) {
                this.setCorreo(
                    empleado_next.primer_nombre,
                    empleado_next.primer_apellido,
                    empleado_next.pais
                );
            } else {
                this.props.updateInputs('info.correo', null);
            }
        }
    }

    componentWillUnmount() {
        this.props.limpiar();
    }

    accion = (e) => {
        e.preventDefault();
        if (this.props.id) {
            //Actualizar
            this.props.accion(this.props.id);
        } else {
            // Registrar
            this.props.accion();
        }
    };

    getFecha = (fecha) => {
        fecha = fecha.split('T');
        return fecha[0];
    };

    render() {
        const { info, paises, tipo_identificaciones } = this.props;

        return (
            <Fragment>
                <form onSubmit={(e) => this.accion(e)}>
                    <div className="row">
                        <div className="col-md-4">
                            <label
                                htmlFor="primer_apellido"
                                className="form-label"
                            >
                                Primer apellido
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="primer_apellido"
                                value={
                                    info.get('primer_apellido')
                                        ? info.get('primer_apellido')
                                        : ''
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'info.primer_apellido',
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />
                        </div>

                        <div className="col-md-4">
                            <label
                                htmlFor="segundo_apellido"
                                className="form-label"
                            >
                                Segundo apellido
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="segundo_apellido"
                                value={
                                    info.get('segundo_apellido')
                                        ? info.get('segundo_apellido')
                                        : ''
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'info.segundo_apellido',
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />
                        </div>

                        <div className="col-md-4">
                            <label
                                htmlFor="primer_nombre"
                                className="form-label"
                            >
                                Primer nombre
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="primer_nombre"
                                value={
                                    info.get('primer_nombre')
                                        ? info.get('primer_nombre')
                                        : ''
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'info.primer_nombre',
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-4">
                            <label
                                htmlFor="otros_nombres"
                                className="form-label"
                            >
                                Otros nombres
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="otros_nombres"
                                value={
                                    info.get('otros_nombres')
                                        ? info.get('otros_nombres')
                                        : ''
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'info.otros_nombres',
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="pais" className="form-label">
                                País
                            </label>
                            <select
                                className="form-control form-select"
                                id="pais"
                                value={
                                    info.get('pais') ? info.get('pais') : '0'
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'info.pais',
                                        e.target.value
                                    )
                                }
                            >
                                <option value="0" disabled>
                                    Seleccione el país
                                </option>
                                {paises &&
                                    paises.map((x) => {
                                        return (
                                            <option
                                                key={`${x.get('uid')}`}
                                                value={x.get('nombre')}
                                            >
                                                {x.get('nombre')}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="pais" className="form-label">
                                Tipo de identificacición
                            </label>
                            <select
                                className="form-control form-select"
                                id="tipo_identificacion"
                                value={
                                    info.get('tipo_identificacion')
                                        ? info.get('tipo_identificacion')
                                        : '0'
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'info.tipo_identificacion',
                                        e.target.value
                                    )
                                }
                            >
                                <option value="0" disabled>
                                    Seleccione el tipo de identificación
                                </option>
                                {tipo_identificaciones &&
                                    tipo_identificaciones.map((x) => {
                                        return (
                                            <option
                                                key={`${x.get('uid')}`}
                                                value={x.get('nombre')}
                                            >
                                                {x.get('nombre')}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-4">
                            <label
                                htmlFor="identificacion"
                                className="form-label"
                            >
                                Identificación
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="identificacion"
                                value={
                                    info.get('identificacion')
                                        ? info.get('identificacion')
                                        : ''
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'info.identificacion',
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="correo" className="form-label">
                                Correo
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="correo"
                                value={
                                    info.get('correo') ? info.get('correo') : ''
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'info.correo',
                                        e.target.value
                                    )
                                }
                                disabled
                            />
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="correo" className="form-label">
                                Fecha Ingreso
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="fechaIngreso"
                                value={
                                    info.get('fechaIngreso')
                                        ? this.getFecha(
                                              info.get('fechaIngreso')
                                          )
                                        : ''
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'info.fechaIngreso',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-4">
                            <label htmlFor="correo" className="form-label">
                                Fecha Registro
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="fechaRegistro"
                                value={
                                    info.get('fechaRegistro')
                                        ? this.getFecha(
                                              info.get('fechaRegistro')
                                          )
                                        : ''
                                }
                                disabled
                            />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-12 mt-5">
                            <button className="btn btn-primary" type="submit">
                                {this.props.id ? 'Actualizar' : 'Registrar'}
                            </button>
                        </div>
                    </div>
                </form>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        info: state.empleado.get('info'),
        paises: state.empleado.get('paises'),
        tipo_identificaciones: state.empleado.get('tipo_identificaciones'),
        correos_similares: state.empleado.get('correos_similares')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateInputs: (path, value) => dispatch(updateInputs(path, value)),
        getPaises: () => dispatch(getPaises()),
        getTipoIdentificaciones: () => dispatch(getTipoIdentificaciones()),
        getCorreosSimilares: () => dispatch(getCorreosSimilares()),
        getEmpleado: (id) => dispatch(getEmpleado(id)),
        limpiar: () => dispatch(limpiar())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Empleado);
