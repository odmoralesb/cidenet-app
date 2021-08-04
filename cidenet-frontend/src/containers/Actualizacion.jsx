import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Acciones
import { registrar } from '../actions/empleado';

// Componentes
import Empleado from '../components/empleado';

class Registro extends Component {
    registrar = (e) => {
        e.preventDefault();
        this.props.registrar();
    };

    render() {
        return (
            <Fragment>
                <h4>Actualizacion de empleado</h4>
                <hr />
                <Empleado
                    accion={this.registrar}
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
        registrar: () => dispatch(registrar())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registro);
