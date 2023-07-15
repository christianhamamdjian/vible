import * as ACTIONS from './actions'

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_TEXT:
            const text = action.payload
            return (
                { ...state, itemText: text }
            )

        default:
            return state
    }
}
export default reducer