import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Acciones

class Registro extends Component {
    render() {
        return <Fragment>Registro funcionando ...</Fragment>;
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Registro);
