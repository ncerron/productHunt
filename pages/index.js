import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";

const Home = () => {
  const [productos, guardarProductos] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const obtenterProductos = () => {
      firebase.db
        .collection("productos")
        .orderBy("creado", "desc")
        .onSnapshot(manejarSnapshot);
    };
    obtenterProductos();
  }, []);

  function manejarSnapshot(snapshot) {
    const productos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarProductosx(productos);
  }

  return (
    <div>
      <Layout>
        <h1>Inicio npm run de</h1>
      </Layout>
    </div>
  );
};

export default Home;
