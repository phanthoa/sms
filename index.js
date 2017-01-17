import React, { Component, } from 'react'
import { View, 
       StyleSheet,
       Dimensions,} from 'react-native'
import smsview from './smsview.js';
import Content from './content.js';
var {width, height} = Dimensions.get('window');
import { Router, Scene } from 'react-native-router-flux';
class Index extends Component {
  
  static propTypes = {}

  static defaultProps = {}
  constructor(props) {
    super(props)
    this.state = {
      
    }
   
  }

  render() {
    return (
      <Router key = "root">
        <Scene key ="smsview" component = {smsview} title = "SMS Chúc Têt" initial = {true} titleStyle = {styles.TouText} />
        <Scene key ="Content" component = {Content} title = {this.props.title} hideNavBar = {true} titleStyle = {styles.TouText}/>
      </Router>
    )
  }
}
const styles = StyleSheet.create({
  
  TouText : {
    fontSize: 17,
    width : width - 100,
    textAlign: 'center',
  },
});

export default Index