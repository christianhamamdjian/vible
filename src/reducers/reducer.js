import * as ACTIONS from './actions'

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_TEXT:
            const text = action.payload
            return (
                { ...state, itemText: text }
            )
        case ACTIONS.ADD_COLOR:
            const color = action.payload
            return (
                { ...state, itemColor: color }
            )
        case ACTIONS.ADD_LINK:
            const link = action.payload
            return (
                { ...state, itemLink: link }
            )
        case ACTIONS.ADD_URL:
            const url = action.payload
            return (
                { ...state, itemUrl: url }
            )
        case ACTIONS.ADD_VIDEO_URL:
            const videoUrl = action.payload
            return (
                { ...state, itemVideoUrl: videoUrl }
            )
        case ACTIONS.ADD_IMAGE_URL:
            const imageUrl = action.payload
            return (
                { ...state, itemImageUrl: imageUrl }
            )
        case ACTIONS.ADD_MAP_URL:
            const mapUrl = action.payload
            return (
                { ...state, itemMapUrl: mapUrl }
            )
        default:
            throw new Error('Unknown action')
    }
}
export default reducer