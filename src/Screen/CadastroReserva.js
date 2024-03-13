import React, { Component } from 'react';
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

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
            <View style={estilo.componentCadastro}>

              <Text style={estilo.textMenu}>Alcance Clínica Integrada</Text>

              <TextInput
                style={estilo.inputBox}
                placeholder="Digite a Sala"
                value={this.state.identificacaoSala}
                onChangeText={(valor) => {
                  this.setState({ identificacaoSala: valor });
                }}
              />
              <TouchableOpacity
                style={estilo.inputBox}
                onPress={() => this.setState({ showDatePicker: true, activeInput: 'data' })}
              >
                <Text>{dataReservaSala.toLocaleDateString('pt-BR')}</Text>
              </TouchableOpacity>
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
              <TouchableOpacity
                style={estilo.inputBox}
                onPress={() => this.setState({ showTimePicker: true, activeInput: 'hora' })}
              >
                <Text>
                  {horaReservaSala.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  {' '}
                  h
                </Text>
              </TouchableOpacity>
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
              <TextInput
                style={estilo.inputBox}
                placeholder="Digite o nome do profissional"
                value={this.state.profissionalReservaSala}
                onChangeText={(valor) => {
                  this.setState({ profissionalReservaSala: valor });
                }}
              />
              <View style={estilo.cameraContainer}>
                <Camera onPictureTaken={this.onPictureTaken} />
              </View>

              <TouchableOpacity style={estilo.button} onPress={this.ReservarSala}>
                <Text style={estilo.buttonText}>Reservar Sala</Text>
              </TouchableOpacity>
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
  componentCadastro: {
    alignItems: 'center',
    marginVertical: 20,
  },
  textMenu: {
    color: 'green',
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  inputBox: {
    shadowColor: '#11803b',
    shadowOpacity: 0.9,
    elevation: 0.5,
    borderWidth: 0.5,
    borderColor: 'green',
    fontSize: 14,
    width: 360,
    height: 40,
    marginBottom: 15,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateTimeText: {
    fontSize: 16,
    marginBottom: 10,
  },
  cameraContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    width: 150,
  },
});
