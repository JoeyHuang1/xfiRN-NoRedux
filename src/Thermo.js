import React from 'react';
import thermoService from "./thermoService.js"
import PropTypes from 'prop-types';
import {Text,  Slider, SafeAreaView, View} from 'react-native';
import styles from './style.js'


const minTempe=50
const maxTempe=90


class Thermo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tempeClass:'',
      sliderValue: this.props.temperature,
      temperature: this.props.temperature,
    };
  }
  
  onSliderChange = (sliderValue) => {
    this.setState({sliderValue});
  }

  onAfterChange = async (value) => {
    this.setState({tempeClass: 'blinkClass'})
    try {
      await thermoService(this.props.accessToken, this.props.seedId, value)
      this.setState({temperature: value})
    }catch(e){
      this.setState({sliderValue: this.state.temperature})
    }
    this.setState({tempeClass: ''})
  }

  render(){
    return (
      <SafeAreaView >
      <View style={styles.thermo}>
        <Text style={styles.normalText}>Thermostat {this.props.name}:
          <Text > {this.state.sliderValue} </Text>
        </Text>
        <Slider value={this.state.sliderValue} 
              minimumValue={minTempe} maximumValue={maxTempe}
              step={1}
              minimumTrackTintColor="red"
              maximumTrackTintColor="blue"
              onValueChange={this.onSliderChange}
              onSlidingComplete={this.onAfterChange}
        />
      </View>
    </SafeAreaView>
    );
  }
}


Thermo.propTypes = {
  seedId:PropTypes.string.isRequired,
  name:PropTypes.string
};

export default Thermo