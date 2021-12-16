import axios from "axios";

import {
    GET_ERRORS
} from "./types";

//add Recetas

// Register Receta
export const registerReceta = ({ categoria, ...newReceta }, history) => dispatch => {
    Promise.all([callRegisterRecetaApi('recetas', newReceta), callRegisterRecetaApi(categoria, newReceta)])
        .then((responses) => history.push("/home/upload/true"))

        .then(res => history.push("/home/upload/true")) // re-direct to RecetaRegistrada
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

const callRegisterRecetaApi = (categoria, newReceta) => {
    return axios
        .post(`http://localhost:5000/${categoria}/add`, newReceta)
}

