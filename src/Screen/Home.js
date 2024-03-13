import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import MenuComponent from '../Components/MenuComponent';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MenuComponent />
        <View style={styles.welcomeContainer}>
          <Text style={styles.textTitulo}>Bem-vindo a ALCANCE</Text>
          <Text style={styles.descriptionText}>
            A Alcance Clinica Integrada é dedicada a fornecer serviços nas
            áreas de fonoaudiologia, fisioterapia, reforço escolar, psicologia,
            terapia ocupacional e musicalização e educação física.
          </Text>
          <Text style={styles.TextDestaque}>Venha nos conhecer!!!</Text>
          <Image
            source={require('../Imagens/turma.jpg')}
            style={styles.welcomeImage}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f9f9',
    padding: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  textTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#007bff',
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  welcomeImage: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  TextDestaque: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 15,
  },

});
