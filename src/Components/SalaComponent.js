import React, { Component } from 'react';
import {  StyleSheet, View, Image, } from 'react-native';
import { Surface, Button, Text, } from 'react-native-paper';


export default class SalaComponent extends Component {
  render() {
    return (
      <Surface style={estilo.container} elevation={4}>
        <View style={estilo.imagemContainer}>
          <Image
            style={estilo.imagem}
            source={this.props.imagem ? { uri: this.props.imagem } : require('../Imagens/alcance.png')}
          />
        </View>
        <Surface  elevation={1}>
          <Text style={estilo.textLista}>
            Sala:
            {' '}
            <Text style={estilo.textConteudo}>{this.props.identificacaoSala}</Text>
          </Text>
          <Text style={estilo.textLista}>
            Data da Reserva:
            {' '}
            <Text style={estilo.textConteudo}>
              {' '}
              {new Date(this.props.dataReservaSala).toLocaleDateString('pt-BR')}
            </Text>
          </Text>
          <Text style={estilo.textLista}>
            Hora da Reserva:
            <Text style={estilo.textConteudo}>
              {' '}
              {new Date(this.props.horaReservaSala).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false })}
              {' '}
              h
            </Text>
          </Text>
          <Text style={estilo.textLista}>
            Profissional:
              {' '}
            <Text style={estilo.textConteudo}>{this.props.profissionalReservaSala}</Text>
          </Text>
        </Surface>

        <Text style={estilo.textListaStatus}>{this.props.status}</Text>

        <Button
          mode="contained"
          buttonColor='red'
          onPress={() => this.props.Remover(this.props.id)}
        >
          Excluir Reserva
        </Button>
      </Surface>
    );
  }
}
const estilo = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    elevation: 2,
  },
 
  textLista: {
    color: 'green',
    fontSize: 15,
    margin: 5,
    fontWeight: 'bold',
  },
  textConteudo: {
    color: 'black',
    fontWeight: 'normal',
  },
  textListaStatus: {
    color: 'blue',
    fontWeight: 'bold',
    paddingVertical: 14,
  },
  imagem: {
    height: 130,
    width: 250,
  },
});
