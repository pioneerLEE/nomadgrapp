import React from 'react';
import { AppLoading, Asset, Font } from "expo"
import {Ionicons,MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from 'react-native';

class App extends React.Component {
  state ={
    isLoadingComplete: false 
  }
  render() {
    const { isLoadingComplete } = this.state;
    if(!isLoadingComplete){
      return(<AppLoading
        startAsync={this._loadAssetsAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
  _loadAssetsAsync = async() =>{ // 이하 적혀있는 로딩해야할 Asset, Font을 Promise해놓는다.
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/logo.png"),
        require("./assets/images/logo-white.png"),
        require("./assets/images/noPhoto.jpg"),
        require("./assets/images/photoPlaceholder.png")
      ]),
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font,
      })
    ]);
  };
  _handleLoadingError = error =>{ //로딩 도중에 에러가 날 경우에 대한 반응
    console.error(error);
  }
  _handleFinishLoading = async() =>{ // 로딩이 끝날 경우의 대한 반응
    this.setState({
      isLoadingComplete:true
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;