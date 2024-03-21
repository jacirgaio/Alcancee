import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { TextInput, Divider, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import SalaModel from '../Models/SalaModel.js';
import SalaDB from '../Database/SalaDB.js';
import Camera from '../Components/Camera.js';

export default class CadastroReserva extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identificacaoSala: '',
      dataReservaSala: new Date(),
      horaReservaSala: new Date(),
      profissionalReservaSala: '',
      status: 'Reservada',
      imagem: null,
      lista: [],
      showDatePicker: false,
      showTimePicker: false,
      activeInput: '',
    };
  }

  Listar = () => {
    const banco = new SalaDB();
    banco.Listar().then((listaCompleta) => {
      this.setState({ lista: listaCompleta });
    });
  };

  LimparFormulario = () => {
    this.setState({
      identificacaoSala: '',
      profissionalReservaSala: '',
      imagem: null,
    });
  };

  ValidarCampos = () => {
    const {
      identificacaoSala,
      dataReservaSala,
      horaReservaSala,
      profissionalReservaSala,
    } = this.state;

    if (!identificacaoSala || !dataReservaSala || !horaReservaSala || !profissionalReservaSala) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return false;
    }

    return true;
  };

  ReservarSala = () => {
    if (this.ValidarCampos()) {
      const {
        identificacaoSala,
        dataReservaSala,
        horaReservaSala,
        profissionalReservaSala,
        status,
        imagem,
      } = this.state;

      const novaSala = new SalaModel(
        identificacaoSala,
        dataReservaSala,
        horaReservaSala,
        profissionalReservaSala,
        status,
        imagem,
      );

      const banco = new SalaDB();
      banco.Inserir(novaSala);
      this.Listar();
      this.LimparFormulario();

      Alert.alert('Reserva Concluída', 'A sala foi reservada com sucesso!');
    }
  };

  onPictureTaken = (imagem) => {
    this.setState({ imagem });
  };

  render() {
    const {
      dataReservaSala, horaReservaSala, showDatePicker, showTimePicker, activeInput,
    } = this.state;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={estilo.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={estilo.container}>
            <View  style={estilo.componentCadastro}>
              <Text variant="titleLarge" style={estilo.textMenu}>Alcance Clínica Integrada</Text>
              <TextInput
                label="Sala"
                style={estilo.input}
                value={this.state.identificacaoSala}
                mode='outlined'
                textColor='green'
                onChangeText={(valor) => {
                  this.setState({ identificacaoSala: valor });
                }}
              />

              <TextInput
                label="Profissional"
                style={estilo.input}
                mode='outlined'
                textColor='green'
                value={this.state.profissionalReservaSala}
                onChangeText={(valor) => {
                  this.setState({ profissionalReservaSala: valor });
                }}
              />

              <TextInput
                label="Data de Reserva"
                style={estilo.input}
                mode='outlined'
                textColor='green'
                value={dataReservaSala.toLocaleDateString('pt-BR')}
                right={
                  <TextInput.Icon
                    icon="calendar"
                    onPress={() => this.setState({ showDatePicker: true, activeInput: 'data' })}
                  />
                }
              />
              {showDatePicker && activeInput === 'data' && (
                <DateTimePicker
                  value={dataReservaSala}
                  mode="date"
                  display="default"
                  locale="pt-BR"
                  onChange={(event, selectedDate) => {
                    this.setState({
                      dataReservaSala: selectedDate || dataReservaSala,
                      showDatePicker: false,
                    });
                  }}
                />
              )}

              <TextInput
                label="Hora de Reserva"
                style={estilo.input}
                mode='outlined'
                textColor='green'
                value={`${horaReservaSala.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} h`}
                right={
                  <TextInput.Icon
                    icon="clock"
                    onPress={() => this.setState({ showTimePicker: true, activeInput: 'hora' })}
                  />
                }
              />
              {showTimePicker && activeInput === 'hora' && (
                <DateTimePicker
                  value={horaReservaSala}
                  mode="time"
                  display="default"
                  is24Hour
                  onChange={(event, selectedDate) => {
                    this.setState({
                      horaReservaSala: selectedDate || horaReservaSala,
                      showTimePicker: false,
                    });
                  }}
                />
              )}
              <View style={estilo.cameraContainer}>
                <Camera onPictureTaken={this.onPictureTaken} />
              </View>

              <Button
                mode="contained"
                buttonColor='green'
                onPress={this.ReservarSala}
              >
                Reservar
              </Button>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textMenu: {
    color: 'green',
    fontWeight: 'bold',
    marginVertical: 20,
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },

  cameraContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },

  input: {
    marginBottom: 6,
  },
});
