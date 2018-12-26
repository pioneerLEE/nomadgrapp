import React from 'react';
import { AppLoading, Asset, Font } from "expo"
import {Ionicons,MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
//PersistGate란 앱로딩이 앱이 전체 로딩되기 전까지는 앱을 보여주지 않는 것처럼, 디스크에서 리덕스 스토어를 불러오기전까지는 앱을 보여주지 않는다.
import configureStore from "./redux/configureStore";
import AppContainer from "./components/AppContainer";
const { persistor, store } = configureStore(); //함수로 선언했으므로...

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
    }//state를 다 들고오면 PersistGate가 열려 이하의 뷰들을 실행할 수 있다. 디스크에서 스토어를 가져오는 것과 연결되었다.
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
      
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
