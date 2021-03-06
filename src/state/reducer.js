

export const initialstate = {
    profile: null,
    pagereload: null,
    cartuncomplete: null,
    cartcomplete: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "PAGE_RELOAD":
            return {
                ...state,
                pagereload: action.pagereload
            }
        case "ADD_CARTUNCOMPLETE":
            return {
                ...state,
                cartuncomplete: action.cartuncomplete
            }
        case "ADD_CARTCOMPLETE":
            return {
                ...state,
                cartcomplete: action.cartcomplete
            }
        default:
            return state;
    }
}

export default reducer;