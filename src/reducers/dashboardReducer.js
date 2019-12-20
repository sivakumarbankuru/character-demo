const initialState = {
    isLoading: false,
    characters: []
}

export default (state=initialState, action) => {
    switch(action.type) {
        case 'CHARACTERS.REQUEST':
            return {
                ...state,
                characters: [],
                isLoading: true
            }
        case 'CHARACTERS.RESPONSE':
            const {characters} = action.payload
            return {
               ...state,
               characters,
               isLoading: false
            }
        default:
            return state
    }
}