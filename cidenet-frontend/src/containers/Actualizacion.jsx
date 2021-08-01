import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Acciones

class Actualizacion extends Component {
    render() {
        return <Fragment>Actualizacion funcionando ...</Fragment>;
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Actualizacion);
