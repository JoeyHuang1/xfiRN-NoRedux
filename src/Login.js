import React from 'react';
import PropTypes from 'prop-types'
import loginService from './loginService.js'
import {Text,  Button, TextInput, SafeAreaView} from 'react-native';
import styles from './style.js'

const loginErrMsg = 'Login failed. Please try again.'

class Login extends React.Component {
    constructor(props) {
    super(props);
    this.state = {account:'', password:'', errMsg:'', loginClass:''};
  }

  passwordChange=(text)=>{
    this.setState({password: text})
  }

  accountChange=(text)=>{
    this.setState({account: text})
  }

  getAccessToken= async (account, password)=>{
    this.setState({loginClass:'blinkClass'})
    try {
      let respObj = await loginService(account, password)
      this.setState({errMsg: '', loginClass:''})
      this.props.onSubmit(respObj.access_token, respObj.fullName)
    } catch(e) {
      console.log(new Error(e))
      this.setState({errMsg: loginErrMsg, loginClass:''})
    }
  }
  
  handleSubmit = (e)=>{
    e.preventDefault()
    this.getAccessToken(this.state.account, this.state.password)
  }

  render() {
    return (
      <SafeAreaView>
        <Text style={styles.welcome}>Please login:</Text>
        <TextInput 
          style={styles.input}
          value={this.state.account} 
          onChangeText={this.accountChange}
          autoCapitalize={"none"}
          placeholder={"email address"} />
        <TextInput  
          style={styles.input}
          value={this.state.password} 
          autoCapitalize={"none"}
          textContentType={"password"}
          secureTextEntry={true}
          onChangeText={this.passwordChange}
          placeholder={"password"} />
        <Button 
          onPress={this.handleSubmit}
          title={"Login"}
        />
        <Text>{this.state.errMsg}</Text>
      </SafeAreaView>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
export default Login