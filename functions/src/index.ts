import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);


export const subscribeToTopic = functions.https.onCall(
    async (data, context) => {
        // admin.initializeApp({
        //     credential: admin.credential.cert('src/app/services/sosnyp-dcf02-firebase-adminsdk-ogy7e-0bb0e08182.json'),
        //     databaseURL: "https://sosnyp-dcf02.firebaseio.com"
        //   });


        await admin.messaging().subscribeToTopic(data.token, data.topic);

        return 'subscribed to ${data.topic}';
    }
);

export const unsubscribeFromTopic = functions.https.onCall(
    async (data, context) => {
        // admin.initializeApp({
        //     credential: admin.credential.cert('src/app/services/sosnyp-dcf02-firebase-adminsdk-ogy7e-0bb0e08182.json'),
        //     databaseURL: "https://sosnyp-dcf02.firebaseio.com"
        //   });

        await admin.messaging().unsubscribeFromTopic(data.token, data.topic);

        return 'unsubscribed to ${data.topic}';
    }
);

export const sendOnFirestoreCreate = functions.firestore
    .document('sos/{sosId}')
    .onCreate(async snapshot => {

        // admin.initializeApp({
        //     credential: admin.credential.cert('src/app/services/sosnyp-dcf02-firebase-adminsdk-ogy7e-0bb0e08182.json'),
        //     databaseURL: "https://sosnyp-dcf02.firebaseio.com"
        //   });

        const sos = snapshot.data();


        const notification: admin.messaging.Notification = {
            title: 'Emergency help from a student!!!',
            body: sos!.headline
        };

        const payload: admin.messaging.Message = {
            notification,
            webpush: {
                notification: {
                    vibrate: [200, 100, 200],
                    icon: 'https://image.flaticon.com/icons/svg/1100/1100349.svg',
                    actions: [
                        {
                            action: sos!.mapURL,
                            title: "Open Location"
                        }
                    ]
                }
                
            },
            topic: 'sos'
        };

        return admin.messaging().send(payload);
    });