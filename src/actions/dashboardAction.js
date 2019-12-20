import actionTypes from '../utils/actionTypes';
import { getCharactersApi } from '../api/dashboardApi';

export const getCharacters = () => dispatch => {
    dispatch({ type: actionTypes.CHARACTERS.REQUEST });
    dispatch(getCharactersApi())
        .then(res => {
            console.log(res)
            if (res && res.status === 200) {
                return res
            } return {}
        })
        .then((res) => {
            console.log('res', res.data.results)
            if(res.data && res.data.results) {
                dispatch({
                    type: actionTypes.CHARACTERS.RESPONSE,
                    payload: {
                        characters: res.data.results
                    }
                })
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
            console.log(err)
            alert('Error occured while fetching data');
        })
}