import React, { Component } from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imageLinkForm';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/faceRecognition';
import SignIn from './components/SignIn/signIn';
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
    imageUrl: '',
    box:{},
    route: 'signin'
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.querySelector("#input-image");
    const width= Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = box => {
    console.log(box);
    this.setState({box: box});
  }
  
  handleInputChange= (event) => {
    this.setState({input:event.target.value});
  };

  handleButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      //console.log();
      .catch(err => console.log(err));
  }

  handleRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
         <Particles className="particles"
              params={particlesOptions}
            />
       <Navigation onRouteChange={this.handleRouteChange}/>
       {(this.state.route === 'signin')
        ? <SignIn onRouteChange={this.handleRouteChange}/> 
        : <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.handleInputChange} 
              onButtonSubmit={this.handleButtonSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
       }
      </div>
    );
  }
}

export default App;
