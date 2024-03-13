import React, { Component } from 'react';
import {
  ScrollView, TouchableOpacity, StyleSheet, Text, View, useFocusEffect,
} from 'react-native';
import SalaComponent from '../Components/SalaComponent.js';
import SalaDB from '../Database/SalaDB.js';
import { notificationService } from '../Services/NotificationService.js';

export default class ListaReservas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descricao: '',
      dataTermino: '',
      prioridade: '',
      status: 'Reservada',
      imagem: '',
      lista: [],
      mostrarFormulario: false,
    };
  }

  componentDidMount() {
    this.Listar();
    this.agendarNotificacoes();

    const unsubscribeFocus = this.props.navigation.addListener('focus', () => {
      this.Listar();
    });

    return () => {
      unsubscribeFocus();
    };
  }

  componentWillUnmount() {
    notificationService.cancelarTodasNotificacoes(); // Corrija a chamada do método de cancelamento de notificações
  }

  Listar = () => {
    const banco = new SalaDB();
    banco.Listar().then((listaCompleta) => {
      this.setState({ lista: listaCompleta });
    });
  };

  Remover = (id) => {
    const banco = new SalaDB();
    banco.Remover(id);
    this.Listar();
  };

  agendarNotificacoes = () => {
    const { lista } = this.state;
    lista.forEach((reserva) => {
      const dataHoraReserva = new Date(`${reserva.dataReservaSala}T${reserva.horaReservaSala}`);
      const dataHoraNotificacao = new Date(dataHoraReserva.getTime() - 15 * 60000); // 15 minutos antes
      const agora = new Date();
      if (dataHoraNotificacao > agora) {
        notificationService.mostrarNotificacao(
          reserva.id,
          'Reserva de Sala',
          'Sua reserva está chegando em 15 minutos',
          {},
          {
            largeIcon: 'ic_launcher', smallIcon: 'ic_launcher', playSound: true, soundName: 'default',
          },
          dataHoraNotificacao,
        );
      }
    });
  };

  render() {
    return (
      <View style={estilo.container}>
        <View style={estilo.conteudo}>
          <TouchableOpacity style={estilo.botoes} onPress={() => this.Listar()}>
            <Text style={estilo.botaoText}>Atualizar Lista</Text>
          </TouchableOpacity>
          <ScrollView style={estilo.scroll}>
            {this.state.lista.length === 0 ? (
              <Text style={estilo.textTitulo}>Não há salas reservadas</Text>
            ) : null}
            {this.state.lista.map((l) => (
              <SalaComponent
                style={estilo.SalaComponent}
                key={l.id}
                id={l.id}
                identificacaoSala={l.identificacaoSala}
                dataReservaSala={l.dataReservaSala}
                horaReservaSala={l.horaReservaSala}
                profissionalReservaSala={l.profissionalReservaSala}
                status={l.status}
                imagem={l.imagem}
                Remover={this.Remover}
                Atualizar={this.Atualizar}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  SalaComponent: {
    alignItems: 'center',
  },

  conteudo: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  textMenu: {
    color: 'green',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  textTitulo: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },

  inputBox: {
    shadowColor: '#11803b',
    shadowOpacity: 0.9,
    elevation: 0.5,
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    fontSize: 14,
    width: 360,
    height: 40,
    borderColor: 'green',
    paddingHorizontal: 10,
  },

  botoes: {
    backgroundColor: 'green',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    marginBottom: 20,
    borderRadius: 7,
  },

  scroll: {
    width: '100%',
    marginTop: 15,
  },

  botaoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
