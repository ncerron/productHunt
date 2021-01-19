import app from "firebase/app";
import firebaseConfig from "./config";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

class Firebase {
  //cuando se crea nueva instancia de
  //firebase se inicializa al app
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }
  //registra un usuario
  async registrar(nombre, email, password) {
    const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return await nuevoUsuario.user.updateProfile({
      displayName: nombre,
    });
  }
  //inicia sesion
  async login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  //cierra sesion
  async cerrarSesion() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();
export default firebase;
