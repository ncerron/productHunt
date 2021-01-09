import app from "firebase/app";
import firebaseConfig from "./config";

class Firebase {
  //cuando se crea nueva instancia de
  //firebase se inicializa al app
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
  }
}

const firebase = new Firebase();
export default firebase;
