import PushNotification from 'react-native-push-notification';

class NotificationService {
  configure = () => {
    PushNotification.configure({
      onNotification(notification) {
        console.log('NOTIFICATION:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  };

  mostrarNotificacao = (id, titulo, mensagem, userInfo = {}, options = {}, data) => {
    PushNotification.localNotificationSchedule({
      id,
      title: titulo,
      message: mensagem,
      userInfo,
      ...options,
      date: data,
    });
  };

  cancelarNotificacao = (id) => {
    PushNotification.cancelLocalNotifications({ id });
  };

  cancelarTodasNotificacoes = () => {
    PushNotification.cancelAllLocalNotifications();
  };
}

export const notificationService = new NotificationService();
