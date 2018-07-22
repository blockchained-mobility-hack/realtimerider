export const MAPVIEW_START = "MAPVIEW_START";
export const mapview_start = (data) => {
    return {type : MAPVIEW_START, data}
}

export const MAPVIEW = "MAPVIEW";
export const mapview = (data) => {
    return dispatch => {
        dispatch(mapview_start(data));
        }
}

export const MAPVIEW_UPDATE = "MAPVIEW_UPDATE";
export const mapview_update = (data) => {
    return {type : MAPVIEW_UPDATE, data}
}

export const MAPVIEW_UP = "MAPVIEW_UP";
export const mapview_up = (data) => {
    return dispatch => {
        dispatch(mapview_update(data));
    }
}

