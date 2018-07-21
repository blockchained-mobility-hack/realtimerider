import { MAPVIEW_START, MAPVIEW_UPDATE } from '../actions';

const initialState = {
    view: {
        selectedRowId: 0,
        locations : [{position:[-122.4193, 37.7751]},{position:[-122.4374, 37.7574]}],
        viewport: {
                      width: 1500,
                      height: 1500,
                      latitude: 48.1379,
                      longitude: 11.5720,
                      zoom: 14
                    },
        arcs : [{sourcePosition: [11.5720, 48.1379 ], 
        targetPosition: [11.5720, 48.1379 ],
        color : [25, 89, 193] }]
  }
}

const display = (state = initialState, action) => {
    switch (action.type) {
        case MAPVIEW_START:

             var new_state = {
                selectedRowId: 0,
                locations : action.data[0],
                    viewport: {
                      width: 1500,
                      height: 1500,
                      latitude: (action.data[0][0].position[1] + action.data[0][1].position[1])/2.0,
                      longitude: (action.data[0][0].position[0] + action.data[0][1].position[0])/2.0,
                      zoom: 12
                    },
                    arcs : action.data[1]
            };

            console.log("starting updating map" + JSON.stringify(new_state));
            return { ...state, view: new_state }
        case MAPVIEW_UPDATE:
            var new_state = {
                selectedRowId: 0,
                locations : state.view.locations,
                    viewport: {
                      width: 1500,
                      height: 1500,
                      latitude: action.data.latitude,
                      longitude: action.data.longitude,
                      zoom: action.data.zoom
                    },
                    arcs : state.view.arcs
            };
            console.log("starting updating map" + JSON.stringify(new_state));
            return { ...state, view: new_state }
        default:
            return state
    }
}

export default display;