import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Button, Card } from 'react-native-paper';

export default class Camera extends PureComponent {
  render() {
    return (
      <Card.Content style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permissão para usar a câmera',
            message: 'Precisamos da sua permissão para usar sua câmera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancelar',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permissão para usar a gravação de áudio',
            message: 'Precisamos da sua permissão para usar seu áudio',
            buttonPositive: 'OK',
            buttonNegative: 'Cancelar',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />

        <View style={styles.buttonContainer}>
          <Button icon="camera" mode="contained-tonal" onPress={this.takePicture.bind(this)} > Capturar </Button>
        </View>
      </Card.Content>

    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.props.onPictureTaken(data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'columm',
    marginTop: 20,
    padding: 5
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    padding: 5
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5
  },
});
