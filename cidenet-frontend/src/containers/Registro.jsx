import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Acciones
import { updateInputs, registrar } from '../actions/registro';

class Registro extends Component {
    registrar = (e) => {
        e.preventDefault();
        this.props.registrar();
    };

    render() {
        const { empleado } = this.props;
        return (
            <Fragment>
                <h4>Registro de empleados</h4>
                <hr />

                <form className="row g-3" onSubmit={(e) => this.registrar(e)}>
                    <div className="col-md-4">
                        <label htmlFor="primer_apellido" className="form-label">
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
                        <label htmlFor="primer_nombre" className="form-label">
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

                    <div className="col-md-4 mt-2">
                        <label htmlFor="otros_nombres" className="form-label">
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

                    <div className="col-12 mt-5">
                        <button className="btn btn-primary" type="submit">
                            Registrar
                        </button>
                    </div>
                </form>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        empleado: state.registro.get('empleado')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateInputs: (path, value) => dispatch(updateInputs(path, value)),
        registrar: () => dispatch(registrar())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registro);
