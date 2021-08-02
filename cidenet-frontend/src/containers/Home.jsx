import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Acciones
import {
    updateInputs,
    getEmpleados,
    deleteEmpleados
} from '../actions/empleados';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null
        };
    }
    componentWillMount() {
        this.props.getEmpleados();
    }

    selectId = (id) => {
        this.setState({ selectedId: id });
    };

    next = () => {
        const { page, size } = this.props.pagination.toJS();
        this.props.getEmpleados(page + 1, size);
    };

    previous = () => {
        const { page, size } = this.props.pagination.toJS();
        this.props.getEmpleados(page - 1, size);
    };

    render() {
        const { empleados } = this.props;
        return (
            <Fragment>
                <h4>Lista de empleados</h4>
                <hr />

                <div className="row">
                    <div className="col-12">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a
                                        className="page-link"
                                        href="#"
                                        onClick={() => this.previous()}
                                    >
                                        Previous
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a
                                        className="page-link"
                                        href="#"
                                        onClick={() => this.next()}
                                    >
                                        Next
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Identificación</th>
                                    <th scope="col">Apellidos</th>
                                    <th scope="col">Nombres</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">País</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empleados &&
                                    empleados.map((x, i) => {
                                        return (
                                            <tr key={x.get('uid')}>
                                                <td>{i + 1}</td>
                                                <td>
                                                    {x.get('identificacion')}
                                                </td>
                                                <td>{`${x.get(
                                                    'primer_apellido'
                                                )} ${x.get(
                                                    'segundo_apellido'
                                                )}`}</td>
                                                <td>{`${x.get(
                                                    'primer_nombre'
                                                )} ${x.get(
                                                    'otros_nombres'
                                                )}`}</td>
                                                <td>{x.get('correo')}</td>
                                                <td>{x.get('pais')}</td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-danger"
                                                        // onClick={() =>
                                                        //     this.props.deleteEmpleados(
                                                        //         x.get('uid')
                                                        //     )
                                                        // }
                                                        onClick={() =>
                                                            this.selectId(
                                                                x.get('uid')
                                                            )
                                                        }
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal"
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                {this.state.selectedId}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    No
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={() =>
                                        this.props.deleteEmpleados(
                                            this.state.selectedId
                                        )
                                    }
                                >
                                    Si
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        empleados: state.empleados.get('data'),
        pagination: state.empleados.get('pagination')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getEmpleados: (page, size) => dispatch(getEmpleados(page, size)),
        deleteEmpleados: (id) => dispatch(deleteEmpleados(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
