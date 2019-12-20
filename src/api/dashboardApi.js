import axios from 'axios';
import { API_URL } from '../utils/constants';

export const getCharactersApi = () => {
    return (dispatch) => {
        return axios.get(`${API_URL}character/`)
    }
}