import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Acciones
import { buscarEmpleados, updateInputs } from '../actions/empleados';

class Busqueda extends Component {
    render() {
        const { busqueda, pagination } = this.props;

        return (
            <Fragment>
                <form>
                    <div className="row">
                        <div className="col-6">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Nombre, Apellido o Correo"
                                value={
                                    busqueda.get('termino')
                                        ? busqueda.get('termino')
                                        : ''
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'busqueda.termino',
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <div className="col-5">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Identificacion"
                                value={
                                    busqueda.get('identificacion')
                                        ? busqueda.get('identificacion')
                                        : ''
                                }
                                onChange={(e) =>
                                    this.props.updateInputs(
                                        'busqueda.identificacion',
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <div className="col-1">
                            <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={() =>
                                    this.props.buscarEmpleados(
                                        pagination.get('page'),
                                        pagination.get('size'),
                                        {
                                            termino: busqueda.get('termino')
                                                ? busqueda.get('termino')
                                                : '',
                                            identificacion: busqueda.get(
                                                'identificacion'
                                            )
                                                ? busqueda.get('identificacion')
                                                : ''
                                        }
                                    )
                                }
                            >
                                Buscar
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
        busqueda: state.empleados.get('busqueda'),
        pagination: state.empleados.get('pagination')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateInputs: (path, value) => dispatch(updateInputs(path, value)),
        buscarEmpleados: (page, size, filtro) =>
            dispatch(buscarEmpleados(page, size, filtro))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Busqueda);
