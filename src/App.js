import React, { Component } from 'react'
import MobilityMarket from '../build/contracts/MobilityMarket.json'
import getWeb3 from './utils/getWeb3'
import ReactMapGL, {NavigationControl} from 'react-map-gl';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import { Flex, Box } from 'reflexbox';
import classnames from 'classnames';
import Geolocation from "react-geolocation";

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import './style.css';
import "./skeleton.css";

// fixed parameters for rendering
var Button = require('react-bootstrap/lib/Button');
require('dotenv').config()
const accessToken = 'pk.eyJ1Ijoibmlrb2xhdXMiLCJhIjoiY2pmZGs2dTZ0M2Z0NDJ5bXpmZWM3dDZqcCJ9.XhvNk45OB-bvZCU_0x_iiA';
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '0px'
};
const wellStyles = { width: 600, height: 80 };
var divStyle = {
  padding: "5px",
  margin: "5px",
  align: "left"
};
var rider_color = [25, 89, 193];
var driving_color = [244, 164, 66];

// initial location of rider
var rt_location = {'color': rider_color, 'position': [11.5720, 48.1379 ], 'colorScale': 0.8};

// initial number and location of providers (can also live in backend eventually)
var num_cars = 10;
var provider_locations = [];

// define the "spread" of the providers
var interval_lat = [48.1379 - 0.005, 48.1379 + 0.005];
var interval_lng = [11.5720 - 0.005, 11.5720 + 0.005];
var delta_lat = interval_lat[1] - interval_lat[0];
var delta_lng = interval_lng[1] - interval_lng[0];

// populate the providers
var random;
var lat;
var lng;
for (var i = 0; i < num_cars; i++) {
  random = Math.random();
  lat = interval_lat[0] + random * delta_lat;
  random = Math.random();
  lng = interval_lng[0] + random * delta_lng;
  provider_locations.push({'color': driving_color, 'position': [lng, lat], 'colorScale': 0.8})
}

// utils
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      }
    }
       // _updateTrace = () => {
    //   console.log("button pressed");
    //     //current_trace = [otrace[i]];
    //     current_trace.push(rt_location[i]);
    //     console.log("its " + i)
    //     this.props.actions.update_trace_start(current_trace);
    //     i++;
    // };

  _start_request_flow = () => {
      // Inform the rider that things are being requested
      console.log("Starting to request the ride for position: ", rt_location['position']);
      sleep(2000);
      alert("We detected that you need ride. Press ok to start request flow");
      sleep(2000);
      // Submit the request here 

      // Listen to changes

      // Display the correct match
      var eta_minutes = 2.4;
      alert("Driver Max will pick you up in " + eta_minutes + " minutes");
    }

  _updateViewport = (viewport) => {
      const {latitude, longitude, zoom} = viewport;
      var data = {zoom: zoom, latitude: latitude, longitude: longitude};
      this.props.actions.mapview_up(data);
    };

    _logPosition = (lat,lng) => {
      console.log("lat / lng: " + lat + " / " + lng);
      rt_location['position'] = [lng, lat];
    }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const mobilityMarket = contract(MobilityMarket)
    mobilityMarket.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var mobilityMarketInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
          mobilityMarket.deployed().then((instance) => {
            mobilityMarketInstance = instance;
            console.log(accounts[0]);

              var event = mobilityMarketInstance.RequestAdded({});

              // watch for changes
              event.watch(function(error, result){
                  if (!error)
                      console.log(result);
              });

            //return mobilityMarketInstance.addRideRequest(11,11,12,13, {from: accounts[0], gas: 1000000});
              return;
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return mobilityMarketInstance.getRequest.call(0)
      }).then((result) => {
        // Update state with the result.
        return this.setState({ request: result[1].c[0] });
      });
    })
  }

  // submitRideRequest() {
  //   addRideRequest();
  //   //uint8 destLat, uint8 destLong, uint8 startLat, uint8 startLong
  // }

  render() {
    const { 
      className, 
     ...props } = this.props;

    const _update = (data) => {
        this.props.actions.mapview(data);
    }
    
    return (

      <div className={classnames('App', className)} style={divStyle} {...props}>
        <div className="App-header">
          <h1> realtimerider </h1>
        </div>
        <p className="App-intro">
        </p>
        <Flex p={2} align='center'>
        <Box px={2} w={1/4}>
        </Box>
        <Box px={2} w={1/4}>
          <br />
          <Button style={wellStyles} bsStyle="info" onClick={this._start_request_flow}> Start </Button>
        </Box>
        </Flex>
        
        <Geolocation
      render={({
        fetchingPosition,
        position: { coords: { latitude, longitude } = {} } = {},
        error,
        getCurrentPosition
      }) =>
        <div>
          <button onClick={getCurrentPosition,  this._logPosition(latitude, longitude)}>Get Position</button>
          {error &&
            <div>
              {error.message}
            </div>}
          <pre>
            Current position: 
            latitude: {latitude} / 
            longitude: {longitude}
          </pre>
        </div>}
    />
    <div className ="Map">
        <ReactMapGL mapboxApiAccessToken={accessToken}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          {...this.props.view.viewport}
           onViewportChange={this._updateViewport}
         >
        <DeckGL
          {...this.props.view.viewport}
          layers={[
           new ScatterplotLayer({
                id: 'scatterplot-layer',
                data: [rt_location],
                radiusScale: 20,
                outline: false
              }),
           new ScatterplotLayer({
                id: 'scatterplot-layer',
                data: provider_locations,
                radiusScale: 30,
                outline: false,
              })
           ]}
        />
         <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>
      </ReactMapGL>
    </div>   
     </div>
    );
  }
}

export default App
