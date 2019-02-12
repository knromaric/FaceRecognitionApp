import React, { Component } from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imageLinkForm';
import Rank from './components/Rank/rank';
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


class App extends Component {
  state={
    input: ''
  }

  handleInputChange= (event) => {
    console.log(event.target.value)
  };

  handleSubmit = () => {
    console.log('click');
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
        onButtonSubmit={this.handleSubmit} />
      {/*  <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
