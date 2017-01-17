import React, { Component, } from 'react'
import { View,
       StyleSheet,
       TouchableOpacity,
        Dimensions,
        Text,
        ListView,
       } from 'react-native'
var deviceWidth = Dimensions.get('window').width;
import SQLite from 'react-native-sqlite-storage';
import {Actions} from 'react-native-router-flux';
var DanhMuc = [];
class Smsview extends Component {

  static propTypes = {}

  static defaultProps = {}
  
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.state = {
      id: '',
      Name: '',
      data : [],
      dataSource: ds.cloneWithRows(DanhMuc),
    }
     var db = SQLite.openDatabase({name: "dbChucTet2017.db", createFromLocation : "~dbChucTet2017.db" });
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM DanhMuc', [], (tx,results) =>{
          DanhMuc.splice(0, DanhMuc.length);
          var len = results.rows.length;
          for (let i = 0; i < len ; i++) {
             DanhMuc.push({'id': results.rows.item(i).ids, 'Name': results.rows.item(i).Name});
          }
             this.setState({
                dataSource: ds.cloneWithRows(DanhMuc),
            }) 
        });
      });
   
  }
  _renderView (data,sectionID,rowId) {
    return (
      <TouchableOpacity style = {styles.TouView} onPress = {() => Actions.Content({data: data.id , title : data.Name})} >
          <Text style = {styles.TouText}>{data.Name}</Text>
        </TouchableOpacity>
    );
  }
  render() {
    
    return (
      <View style = {styles.container}>
        
        <ListView style = {{marginTop : 60}} dataSource={this.state.dataSource} renderRow={this._renderView}
                   enableEmptySections = {true} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex :1 ,
    backgroundColor: 'white',
  },
  TouView: {
    height : 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : '#f2f2f2',
    margin : 10,
  },
  TouText : {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default Smsview