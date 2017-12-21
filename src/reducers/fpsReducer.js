const fpsReducer = (state = {desirableFps: 10, currentFps: 0, renderingPer2s: 0}, action) => {
    switch(action.type) {
        case "SET_DESIRABLE_FPS":
            state = {
                ...state,
                desirableFps: action.payload
            };
            break;
        case "UPDATE_CURRENT_FPS":
            state = {
                ...state,
                currentFps: ~~action.payload
            };
            break;
        case "UPDATE_RENDERING_PER_2S":
            state = {
                ...state,
                renderingPer2s: state.renderingPer2s + 1
            };
            break;
        case "RESET_RENDERING_PER_2S":
             state = {
                ...state,
                renderingPer2s: 0
            };
            break;
    }
    return state;
};

export default fpsReducer;