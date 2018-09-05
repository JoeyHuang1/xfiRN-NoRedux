import React from 'react';
import Thermo from './Thermo.js'
import PropTypes from 'prop-types';
import thermoListService from './thermoListService.js';
import {Text, SafeAreaView} from 'react-native';
import styles from './style.js'

const noDevErrMsg='No thermostat found.'
const noHCDevErrMsg = 'No heat/cool thermostat found.'

class ThermoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {thermos:[], errMsg:'', accountClass:''};
    this.getThermoList = this.getThermoList.bind(this)
  }

  componentDidMount() {
    this.getThermoList()
  }

  async getThermoList(){
    this.setState({accountClass:'blinkClass'})
    try {
      let thermoList = await thermoListService(this.props.accessToken)

      if (thermoList.length>0)
        this.setState({thermos: thermoList, errMsg:'', accountClass:''})
      else 
        this.setState({thermos: [], errMsg: noHCDevErrMsg, accountClass:''})
    } catch(e) {
      console.log(new Error(e))
      this.setState({thermos: [], errMsg: noDevErrMsg, accountClass:''})
    }
  }
  
  listThermo=()=>{
    return this.state.thermos.map(thermo=>
      <Thermo key={thermo.seedId}
          seedId={thermo.seedId}
          name={thermo.name}
          accessToken = {this.props.accessToken}
          temperature={thermo.temperature}
      />)
  }

  render() {
    return (
      <SafeAreaView>
        <Text>{this.state.errMsg}</Text>
        <Text style={styles.welcome}>Account 
          <Text> {this.props.account} </Text>
        </Text> 
        {this.listThermo()}
      </SafeAreaView>
    );
  }
}

ThermoList.propTypes = {
  account: PropTypes.string.isRequired
};

export default ThermoList