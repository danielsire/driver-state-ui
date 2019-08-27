import React, { Component } from 'react';
import socketIOClient from "socket.io-client"
import './App.css';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      response: '',
      endpoint: "http://localhost:4000"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
    
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC3Kapd-0TEBmocgglqGoRZBZnU6OHH1iE&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
    
    console.log('response: ', this.state.response)
    
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });


    // Create An InfoWindow
    let infowindow = new window.google.maps.InfoWindow()

    if(this.state.response) {
      let marker = new window.google.maps.Marker({
        position: {lat: this.state.response.position[0], lng: this.state.response.position[1]},
        map: map,
        title: 'Driver'
      });
      let contentString = this.state.response.state
  
  
       // Click on A Marker!
       marker.addListener('click', function() {
  
        // Change the content
        infowindow.setContent(contentString)
  
        // Open An InfoWindow
        infowindow.open(map, marker)
      })
    }
  
  }
  
  render() {
    return (
      <main>
        <div id ="map"></div>
      </main>
    )
  }
}

/*
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>
*/
function loadScript(url) {
  let index  = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
