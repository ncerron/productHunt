import React, { useEffect, useState } from "react";
import firebase from "../firebase";

function useAutenticacion() {
  const [usarioAutenticado, guardarUsuarioAutenticado] = useState(null);

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        //si hay usuario autenticado
        guardarUsuarioAutenticado(usuario);
      } else {
        guardarUsuarioAutenticado(null);
      }
    });
    return () => unsuscribe();
  }, []);
  return usarioAutenticado;
}

export default useAutenticacion;
