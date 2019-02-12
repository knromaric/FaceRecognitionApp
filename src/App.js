import React, { Component } from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imageLinkForm';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/faceRecognition';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
  particles: {
    number:{
      value: 100, 
      density: {
        enable: true,
        value_area: 800
      }
    }
    }
  };

const app = new Clarifai.App({
  apiKey: 'f53e9e87f8bb4319bd4c0ee8b16bfcfc'
});

class App extends Component {
  state={
    input: '', 
    imageUrl: ''
  }

  handleInputChange= (event) => {
    this.setState({input:event.target.value});
  };

  handleButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
       this.state.input)
       .then(
      function (response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function (err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className="App">
         <Particles className="particles"
              params={particlesOptions}
            />
       <Navigation />
       <Logo />
       <Rank />
       <ImageLinkForm 
        onInputChange={this.handleInputChange} 
        onButtonSubmit={this.handleButtonSubmit} />
       <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
