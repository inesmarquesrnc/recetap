import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import NavbarNoLogout from '../layout/NavbarNoLogout';

const RecetasConst = props => (
    <tr>
        <td>{props.celiacos._id}</td>
        <td>
            <Link to={"/edit/" + props.celiacos._id}>Edit</Link>
        </td>
    </tr>
)

export class Celiacos extends Component {
    
    constructor(props) {
        super(props);
        this.state = { recetas: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/celiaco/get')
            .then(res => {
                this.setState({ recetas: res.data });
                console.log(this.state.recetas);
            })
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
    }

    getRecetas() {
        return this.state.recetas.map(function (currentReceta, i) {
            return <RecetasConst todo={currentReceta} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <NavbarNoLogout />
                <div className="container" style={{
                    padding: "1em",
                    width: "80%"
                }}>
                    <div className="center card shadow-lg o-hidden border-0 my-5" style={{
                        padding: "2em",
                        backgroundColor: "rgb(243, 239, 239)"
                    }}>
                        {this.state.recetas.map(receta =>
                            <div className="container" style={{ width: '90%', paddingTop: '2%' }}>
                                <h3>{receta.nombre}</h3>
                                <hr/>
                                <div style={{ columnCount: '2', padding: '1em' }}>
                                    <div>
                                        <p>Tiempo: {receta.tiempo_estimado} minutos</p>
                                    </div>
                                    <div>
                                        <p>Comensales: {receta.numero_comensales}</p>
                                    </div>
                                </div>
                                <div style={{ paddingLeft: '2em', paddingBottom: '1em' }}>
                                    <h5>Ingredientes:</h5>
                                    {receta.ingredientes.map(ingrediente => {
                                        return (
                                            <div>
                                                <FontAwesomeIcon icon={faCheck} /> {ingrediente.cantidad} {ingrediente.unidad} de {ingrediente.nombre}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div style={{ paddingLeft: '2em' }}>
                                    <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                                        {receta.pasos.map((paso, index) => {
                                            return (
                                                <div style={{
                                                    width: "80%",
                                                    backgroundColor: 'rgba(92, 136, 75, 0.671)',
                                                    borderRadius: '5px',
                                                    paddingLeft: '1em',
                                                    margin: '1px'
                                                }}>
                                                    <b>Paso {index + 1}</b>
                                                    <p>{paso.descripcion}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )
                        }
                    </div>
                </div >
            </div>
        )
    }
}

export default Celiacos
