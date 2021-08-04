import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Acciones
import { registrar } from '../actions/empleado';

// Componentes
import Empleado from '../components/empleado';

class Registro extends Component {
    render() {
        return (
            <Fragment>
                <h4>Registro de empleados</h4>
                <hr />
                <Empleado accion={this.props.registrar} />
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        registrar: () => dispatch(registrar())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registro);
