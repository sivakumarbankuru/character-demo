import axios from 'axios';
import { API_URL } from '../utils/constants';

export const getCharactersApi = () => {
    console.log('---api--')
    return (dispatch) => {
        return axios.get(`${API_URL}character/`)
    }
}