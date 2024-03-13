import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';

export default class MenuComponent extends Component {
  render() {
    return (
      <View style={estilo.menu}>
        <Image style={estilo.imagem} source={require('../Imagens/alcance.png')} />
      </View>
    );
  }
}

const estilo = StyleSheet.create({
  imagem: {
    width: '100%',
    height: 200,
  },
  menu: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

});
