//import axios from 'axios';

export const UPDATE_TRACE = "UPDATE_TRACE";
export const update_trace = (data) => {
    return { type: UPDATE_TRACE, data}
}

export const UPDATE_TRACE_START = "UPDATE_TRACE_START";
export const update_trace_start = (data) => {
    return dispatch => {
        console.log("update trace fired")
        dispatch(update_trace(data));
        }
}

export const EXPRESS_TEST_START = "EXPRESS_TEST_START";
export const expressTestStart = () => {
    return { type: EXPRESS_TEST_START }
}

export const EXPRESS_TEST_RESULTS = "EXPRESS_TEST_RESULTS";
export const expressTestResults = (data) => {
    return { type: EXPRESS_TEST_RESULTS, data }
}

export const EXPRESS_TEST_ERROR = "EXPRESS_TEST_ERROR";
export const expressTestError = (data) => {
    return { type: EXPRESS_TEST_ERROR, data }
}

// export const EXPRESS_TEST = "EXPRESS_TEST";
// export const expressTest = () => {
//     return dispatch => {
//         dispatch(expressTestStart());
//         axios.get(`/api/express-test`)
//             .then(res => dispatch(expressTestResults(JSON.stringify(res.data))))
//             .catch(err => dispatch(expressTestError(err)))

//     }
// }

export const MAPVIEW_START = "MAPVIEW_START";
export const mapview_start = (data) => {
    console.log("mapview start fired")
    return {type : MAPVIEW_START, data}
}

export const MAPVIEW = "MAPVIEW";
export const mapview = (data) => {
    return dispatch => {
        console.log("mapview fired")
        dispatch(mapview_start(data));
        }
}

export const DASHBOARD_UPDATE = "DASHBOARD_UPDATE";
export const dashboard_update = (data) => {
    console.log("dashboard start fired")
    return {type : DASHBOARD_UPDATE, data}
}

// export const DASHBOARD_UP = "DASHBOARD_UP";
// export const dashboard_up = () => {
//     return dispatch => {
//         console.log("dashboard fired")
//         axios.get(`/api/ereceipts`)
//             //.then(res => dispatch(dbTestResults(JSON.stringify(res.data))))
//             .then(res => dispatch(dashboard_update(res.data)))
//             .catch(err => dispatch(dbTestError(err)))

//         }
//         // dispatch(dashboard_update(data));
//         // }
// }

export const DASHBOARD_REFRESH = "DASHBOARD_REFRESH";
export const dashboard_refresh = (data) => {
    console.log("dashboard refresh fired")
    return {type : DASHBOARD_REFRESH, data}
}

export const DASHBOARD_FRESH = "DASHBOARD_FRESH";
export const dashboard_fresh = (data) => {
    return dispatch => {
        console.log("dashboard fresh up fired" + JSON.stringify(data))
        dispatch(dashboard_refresh(data));
    }
}

export const MAPVIEW_UPDATE = "MAPVIEW_UPDATE";
export const mapview_update = (data) => {
    console.log("mapview update fired")
    return {type : MAPVIEW_UPDATE, data}
}

export const MAPVIEW_UP = "MAPVIEW_UP";
export const mapview_up = (data) => {
    return dispatch => {
        console.log("mapview up fired" + JSON.stringify(data))
        dispatch(mapview_update(data));
    }
}

export const DB_TEST_START = "DB_TEST_START";
export const dbTestStart = () => {
    return { type: DB_TEST_START }
}
export const DB_TEST_RESULTS = "DB_TEST_RESULTS";
export const dbTestResults = (data) => {
    return { type: DB_TEST_RESULTS, data }
}
export const DB_TEST_ERROR = "DB_TEST_ERROR";
export const dbTestError = (data) => {
    return { type: DB_TEST_ERROR, data }
}

// export const DB_TEST = "DB_TEST"
// export const dbTest = () => {
//     return dispatch => {
//         console.log("db Test started new");
//         dispatch(dbTestStart());
//         axios.get(`/api/ereceipts`)
//             //.then(res => dispatch(dbTestResults(JSON.stringify(res.data))))
//             .then(res => dispatch(dbTestResults(res.data)))
//             .catch(err => dispatch(dbTestError(err)))

//         // axios.get(`/api/products`)
//         //     .then(res => dispatch(dbTestResults(JSON.stringify(res.data))))
//         //     .catch(err => dispatch(dbTestError(err)))

//     }
// }