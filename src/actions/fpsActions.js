export function setDesirableFps(fps) {
    return {
        type: "SET_DESIRABLE_FPS",
        payload: fps
    };
}

export function updateCurrentFps(fps) {
    return {
        type: "UPDATE_CURRENT_FPS",
        payload: fps
    };
}

export function updateRenderingPer2s() {
    return {
        type: "UPDATE_RENDERING_PER_2S"
    };
}

export function resetRenderingPer2s() {
    return {
        type: "RESET_RENDERING_PER_2S"
    };
}