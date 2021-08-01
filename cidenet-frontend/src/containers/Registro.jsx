import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Acciones
import {
    updateInputs,
    registrar,
    getPaises,
    getTipoIdentificaciones
} from '../actions/registro';

class Registro extends Component {
    componentWillMount() {
        this.props.getPaises();
        this.props.getTipoIdentificaciones();
    }

    registrar = (e) => {
        e.preventDefault();
        this.props.registrar();
    };

    render() {
        const { empleado, paises, tipo_identificaciones } = this.props;
        return (
            <Fragment>
                <h4>Registro de empleados</h4>
                <hr />

                <form onSubmit={(e) => this.registrar(e)}>
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
                                    empleado.get('primer_apellido')
                                        ? empleado.get('primer_apellido')
                                        : ''
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'empleado.primer_apellido',
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
                                    empleado.get('segundo_apellido')
                                        ? empleado.get('segundo_apellido')
                                        : ''
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'empleado.segundo_apellido',
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
                                    empleado.get('primer_nombre')
                                        ? empleado.get('primer_nombre')
                                        : ''
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'empleado.primer_nombre',
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
                                    empleado.get('otros_nombres')
                                        ? empleado.get('otros_nombres')
                                        : ''
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'empleado.otros_nombres',
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
                                    empleado.get('pais')
                                        ? empleado.get('pais')
                                        : '0'
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'empleado.pais',
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
                                    empleado.get('tipo_identificacion')
                                        ? empleado.get('tipo_identificacion')
                                        : '0'
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'empleado.tipo_identificacion',
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
                                    empleado.get('identificacion')
                                        ? empleado.get('identificacion')
                                        : ''
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'empleado.identificacion',
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 mt-5">
                            <button className="btn btn-primary" type="submit">
                                Registrar
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
        empleado: state.registro.get('empleado'),
        paises: state.registro.get('paises'),
        tipo_identificaciones: state.registro.get('tipo_identificaciones')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateInputs: (path, value) => dispatch(updateInputs(path, value)),
        registrar: () => dispatch(registrar()),
        getPaises: () => dispatch(getPaises()),
        getTipoIdentificaciones: () => dispatch(getTipoIdentificaciones())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registro);
