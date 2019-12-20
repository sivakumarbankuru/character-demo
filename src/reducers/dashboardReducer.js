const initialState = {
    isLoading: false,
    characters: [],
    filterCharacters: []
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
        case 'CHARACTERS.FILTER':
            const {filterCharacters} = action.payload
            return {
            ...state,
            filterCharacters,
        }
        default:
            return state
    }
}