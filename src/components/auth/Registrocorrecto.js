import React, { Component } from 'react'

import './registrocorrecto.css'

export class registrocorrecto extends Component {
    render() {
        return (
            <div className="container" style={{
                padding: "2em",
                width: "70%"}}>
                <div className="card shadow-lg o-hidden border-0 my-5" style={{ padding: "1em", backgroundColor: "rgb(243, 239, 239)" }}>
                    <div className="row">
                        <div className="col">
                            <div className="col">
                                <div className="registro_correcto">
                                    <hr/>
                                    <h1 style={{
                                        marginBottom: "0.5em",
                                        marginTop: "0.5em"
                                    }}>Enhorabuena!</h1>
                                    <hr/>
                                    <h4 style={{color: 'grey'}}>Te has registrado correctamente</h4>
                                    <div className="boton_registro_correcto btn "
                                    style={{
                                        marginTop: "1.5em"
                                    }}
                                    onClick={() => window.location.href = '../login'}>
                                        Empieza ahora
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default registrocorrecto
