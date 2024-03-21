import React, { Component } from 'react';
import {
  ScrollView, StyleSheet, View,
} from 'react-native';
import { List, Button, Text, } from 'react-native-paper';



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
    console.log("componentDidMount chamado");
    this.Listar();
  }

  Listar = () => {
    const banco = new SalaDB();
    banco.Listar().then((listaCompleta) => {
      console.log("Dados obtidos:", listaCompleta);
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
        <List.Section style={estilo.conteudo}>
    
          <List.Subheader>
            <Button
              mode="contained"
              onPress={this.Listar}
            >
              Atualizar Lista
            </Button>
          </List.Subheader>
          
          <ScrollView >
            {this.state.lista.length === 0 ? (
              <Text style={estilo.textTitulo}>Não há salas reservadas</Text>
            ) : (
              this.state.lista.map((l) => (
                <List.Item
                  key={l.id}
                  title={<SalaComponent
                    id={l.id}
                    identificacaoSala={l.identificacaoSala}
                    dataReservaSala={l.dataReservaSala}
                    horaReservaSala={l.horaReservaSala}
                    profissionalReservaSala={l.profissionalReservaSala}
                    status={l.status}
                    imagem={l.imagem}
                    Remover={this.Remover}
                    Atualizar={this.Atualizar}
                  />}
                />
              ))
            )}
          </ScrollView>
          
        </List.Section>
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

   conteudo: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textTitulo: {
    color: 'orange',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
 
});