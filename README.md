# firestore-to-browser

## Update Firestore collection to be readable:

Edit here:
[https://console.firebase.google.com/project/exchange-flow-demo/firestore/rules](https://console.firebase.google.com/project/exchange-flow-demo/firestore/rules)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if false;
    }
  }
}
```

For more info, see:
[https://firebase.google.com/docs/firestore/security/get-started#allow-all](https://firebase.google.com/docs/firestore/security/get-started#allow-all)

## Set up Firebase web app
[https://console.firebase.google.com/project/exchange-flow-demo/settings/general](https://console.firebase.google.com/project/exchange-flow-demo/settings/general).

Use a `<script>` tag and get the value of `firebaseConfig`. It should look something like this:

```javascript
const firebaseConfig = {
    apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "XXXXXXXXXXXXXXXXXX.firebaseapp.com",
    databaseURL: "https://XXXXXXXXXXXXXXXXXX-default-rtdb.firebaseio.com",
    projectId: "XXXXXXXXXXXXXXXXXX",
    storageBucket: "XXXXXXXXXXXXXXXXXX.appspot.com",
    messagingSenderId: "XXXXXXXXXXXX",
    appId: "X:XXXXXXXXXXXX:web:XXXXXXXXXXXXXXXXXXXXXX",
    measurementId: "X-XXXXXXXXXX"
  };
```

Replace `webview/csmain.js` from line 3 with the value of `firebaseConfig` you
got from the Firebase console.

## Initialize your dev environment for hosting

This enables you to upload files from your local environment and publish on
Firbase.

```bash
firebase init hosting
```
