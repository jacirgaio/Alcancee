import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuComponent from '../Components/MenuComponent';

export default class Contato extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MenuComponent />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.addressContainer}>

            <Text style={styles.textTitulo}>Contato</Text>
            <Text style={styles.addressText}>Email: alcanceclinicaintegrada@gmail.com</Text>
            <Text style={styles.addressText}>Fones: (45) 99926-5750 e (45) 99126-1340</Text>

            <Text style={styles.textTitulo}>Redes Sociais</Text>
            <View style={styles.socialLinksContainer}>
              <TouchableOpacity onPress={() => this.openInstagram()} style={styles.socialLink}>
                <Icon name="instagram" size={30} color="#007bff" style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.openFacebook()} style={styles.socialLink}>
                <Icon name="facebook" size={20} color="#007bff" style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.openWhatsApp()} style={styles.socialLink}>
                <Icon name="whatsapp" size={20} color="#007bff" style={styles.socialIcon} />
              </TouchableOpacity>
            </View>

            <Text style={styles.textTitulo}>Nosso Endereço</Text>
            <Text style={styles.addressText}>
              Rua Otilia Mantovani, 550 - Capitão Leônidas Marques, PR
            </Text>

            <Image
              source={require('../Imagens/mapa.jpg')}
              style={styles.mapImage}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  openInstagram() {
    Linking.openURL('https://www.instagram.com/alcanceclinicaintegrada/');
  }

  openFacebook() {
    Linking.openURL('https://www.facebook.com/alcanceclinicaclm/');
  }

  openWhatsApp() {
    Linking.openURL('https://wa.me/5545999265750');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f9f9',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  addressContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#E0FFFF',
    borderRadius: 8,
    padding: 20,
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
    color: '#007bff',
    marginTop: 20,

  },
  addressText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 15,
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialLink: {
    marginHorizontal: 15,
  },
  socialIcon: {
    fontSize: 30,
    color: '#00008B',
  },
});
