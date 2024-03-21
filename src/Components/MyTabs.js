import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';


// Importações de telas
import HomeScreen from '../Screen/Home';
import ReservarScreen from '../Screen/CadastroReserva';
import ListaScreen from '../Screen/ListaReservas';
import ContatoScreen from '../Screen/Contato';



const Home = () => <Text>Home</Text>;
const Reservar = () => <Text>Reservar Sala</Text>;
const Lista = () => <Text>Salas Reservadas</Text>;
const Contato = () => <Text>Contato</Text>;

export default function MyTabs() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home-circle', unfocusedIcon: 'home-circle-outline' },
    { key: 'reservar', title: 'Reservar', focusedIcon: 'store-clock', unfocusedIcon: 'store-clock-outline' },
    { key: 'lista', title: 'Lista', focusedIcon: 'view-list', unfocusedIcon: 'view-list-outline' },
    { key: 'contato', title: 'Contato', focusedIcon: 'contacts', unfocusedIcon: 'contacts-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    reservar: ReservarScreen,
    lista: ListaScreen,
    contato: ContatoScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#97FCA5' }}
    />
  );
}

