import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Acciones
import { actualizar } from '../actions/empleado';

// Componentes
import Empleado from '../components/empleado';

class Registro extends Component {
    render() {
        return (
            <Fragment>
                <h4>Actualización de empleado</h4>
                <hr />
                <Empleado
                    accion={this.props.actualizar}
                    id={this.props.match.params.id}
                />
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actualizar: (id) => dispatch(actualizar(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registro);
