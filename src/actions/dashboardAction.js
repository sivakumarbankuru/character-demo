import actionTypes from '../utils/actionTypes';
import { getCharactersApi } from '../api/dashboardApi';

export const getFilteredCharacters = (characters) => dispatch => {
    dispatch({
        type: actionTypes.CHARACTERS.FILTER,
        payload: {
            filterCharacters: characters
        }
    })
}

export const getCharacters = () => dispatch => {
    dispatch({ type: actionTypes.CHARACTERS.REQUEST });
    dispatch(getCharactersApi())
        .then(res => {
            if (res && res.status === 200) {
                return res
            } return {}
        })
        .then((res) => {
            if(res.data && res.data.results) {
                dispatch({
                    type: actionTypes.CHARACTERS.RESPONSE,
                    payload: {
                        characters: res.data.results
                    }
                })
                dispatch(getFilteredCharacters(res.data.results))
            } else {
                dispatch({
                    type: actionTypes.CHARACTERS.RESPONSE,
                    payload: {
                        characters: []
                    }
                })
            }
            
        })
        .catch((err) => {
            alert('Error occured while fetching data');
        })
}