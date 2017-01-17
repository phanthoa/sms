import React, { Component, } from 'react'
import { View,
        StyleSheet,
        TouchableOpacity,
        Text,
        ListView,
        Dimensions,
        Clipboard,
        Animated,
        Easing,
        notifyMessage,
        Image,
       } from 'react-native'
import ViewPager from 'react-native-viewpager';
import SQLite from 'react-native-sqlite-storage';
import Share, {ShareSheet, Button} from 'react-native-share';
import {takeSnapshot} from "react-native-view-shot";
import RNViewShot  from "react-native-view-shot";
import Toast from "react-native-simple-toast";
var {width, height} = Dimensions.get('window');
var resData = [];
class Content extends Component {
  constructor(props) {
    super(props);
    const data = this.props.data;
  //  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.snapshot = this.snapshot.bind(this)
    var ds = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2,});
    this.state = {
        data : data,
        content : 'Copy',
      dataSource : ds.cloneWithPages(resData),
    }
   // Toast.show({data},Toast.SHORT);
    var db = SQLite.openDatabase({name: "dbChucTet2017.db", createFromLocation : "~dbChucTet2017.db"});
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM listData', [], (tx,results) =>{
          resData.splice(0, resData.length);
          var len = results.rows.length;
          for (let i = 0; i < len ; i++) {
            if (results.rows.item(i).types == 1) {
              resData.push({'_id': results.rows.item(i)._id, 'types': results.rows.item(i).types , 'content' : results.rows.item(i).content});
            }
          }
             this.setState({
                dataSource: ds.cloneWithPages(resData),
            })
             Clipboard.setString(resData[0].content);
        });
      });
          
  }
//   onCancel() {
//     console.log("CANCEL")
//     this.setState({visible:false});
//   }
//   onOpen() {
//     console.log("OPEN");
//     this.setState({visible:true});
//   }
  _setClipboardContent = async () => {
    try {
      var content = await Clipboard.getString();
      this.setState({content});
      Toast.show('Copy Thành Công',Toast.SHORT);
    } catch (e) {
      this.setState({content:e.message});
    }
  };
  _renderPage(data, sectionID, PageID)
  {
    return(
       <Image style = {styles.TouView} source = {require('../Images/icon/form.png')}>
          <Text style = {styles.ViewText}>{data.content}</Text>
        </Image>
    );
    
  }
  _onChangePage (page) {
    Clipboard.setString(resData[page].content);
    console.log(page);
  }
  snapshot = refname => () =>
    RNViewShot.takeSnapshot(this.refs[refname],  {format: "png", quality: 0.8, result: "base64"})
      .then(
          uri => {
            let url = "data:image/png;base64," + uri;
            console.log(url);
            let shareOptions ={
              title : "Chuc tet",
              message : "2017",
              url : url,
            }
            Share.shareSingle(Object.assign(shareOptions, {
                "social": "facebook"
            }));
          }
      );
  render() {
    return (
    
      <View style={{position: 'relative'}}>
          <Image style = {{height : height, width : width , position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}} source = {require('../Images/icon/bg_2.png')}/>
          <View>
            <ViewPager ref = "content" dataSource={this.state.dataSource} renderPage={this._renderPage}
                            isLoop ={true}
                            onChangePage={this._onChangePage}
                           //   renderPageIndicator ={false} 
              />
          </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
//   container: {
//     flex :1 ,
//     backgroundColor: 'white',
//   },
  NavBar: {
    marginTop : 20,
    width : width/2,
    height : 35,
    borderRadius : 4,
    backgroundColor : '#A10F18',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TouView: {
  //  zIndex : 1,
    marginTop : 30,
    height : height /2,
    width : width,
   // backgroundColor : '#transaction',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Btn: {
    marginTop : 40,
    margin : 10,
  },
  ViewText: {
    fontSize: 18,
    textAlign: 'center',
    marginLeft : 35,
    marginRight : 35,
//    margin: 35,
    color : 'red',
  },
  Bt: {
    marginBottom: height/5 - (height/5 - 70),
    height : 50,
    flex : 1,
    margin : 10,
    marginRight: 35,
    marginLeft: 35,
    backgroundColor: '#4ea9fb', 
    borderRadius: 5, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  
});

export default Content