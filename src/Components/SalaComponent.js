import React, { Component } from 'react';
import {
  TouchableOpacity, StyleSheet, Text, View, Image,
} from 'react-native';

export default class SalaComponent extends Component {
  render() {
    return (
      <View style={estilo.container}>
        <View style={estilo.imagemContainer}>
          <Image
            style={estilo.imagem}
            source={this.props.imagem ? { uri: this.props.imagem } : require('../Imagens/alcance.png')}
          />
        </View>
        <View style={estilo.lista}>
          <Text style={estilo.textLista}>
            Sala:
            <Text style={estilo.textConteudo}>{this.props.identificacaoSala}</Text>
          </Text>
          <Text style={estilo.textLista}>
            {' '}
            Data da Reserva:
            <Text style={estilo.textConteudo}>
              {' '}
              {new Date(this.props.dataReservaSala).toLocaleDateString('pt-BR')}
            </Text>
          </Text>
          <Text style={estilo.textLista}>
            {' '}
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
            <Text style={estilo.textConteudo}>{this.props.profissionalReservaSala}</Text>
          </Text>

        </View>
        <Text style={estilo.textListaStatus}>{this.props.status}</Text>
        <View style={estilo.areaBotoes}>
          <TouchableOpacity
            style={[estilo.botoes, { backgroundColor: 'red' }]}
            onPress={() => this.props.Remover(this.props.id)}
          >
            <Text style={estilo.botaoText}>Excluir reserva</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const estilo = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  botoes: {
    flex: 1,
    paddingVertical: 12,
    margin: 5,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  areaBotoes: {
    flexDirection: 'row',
  },
  lista: {
    marginBottom: 10,
  },
  textLista: {
    color: 'green',
    fontSize: 15,
    marginVertical: 3,
    fontWeight: 'bold',
  },
  textConteudo: {
    color: 'black',
    fontWeight: 'normal',
  },
  textListaStatus: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  imagem: {
    height: 200,
    width: 200,
  },
});
