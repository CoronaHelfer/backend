import Environment from '../../config/environments';
import UserService from '../auth/UserService';

const config = Environment;

class NotificationService {

  public async notify(userId: any, notificationType: string, requestId: any) {
    const user = await UserService.findOneWithProjection({_id: userId}, {fcmToken: 1});

    if (user.fcmToken) {
      const admin = require('firebase-admin');

      this.initFirebaseApp(admin);

      const message = {
        data: {
          title: notificationType,
          body: requestId,
        },
        token: user.fcmToken,
      };

      admin.messaging().send(message)
        .then((response) => {
          console.log('Successfully sent notification');
        })
        .catch((error) => {
          console.log('Error sending notification:', error);
        });
    }
  }

  private async initFirebaseApp(admin: any) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: config.FIREBASE_PROJECT_ID,
          clientEmail: config.FIREBASE_CLIENT_EMAIL,
          privateKey: config.FIREBASE_PRIVATE_KEY,
        }),
        databaseURL: config.FIREBASE_DATABASE_URL,
      });
    }
  }

}

export default new NotificationService();
