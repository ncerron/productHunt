import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";
import DetalleProducto from "../components/layout/DetalleProducto";

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
    guardarProductos(productos);
  }

  return (
    <div>
      <Layout>
        <div className="listado-producto">
          <div className="bg-white">
            {productos.map((producto) => (
              <DetalleProducto
                key={producto.id}
                producto={producto}
              ></DetalleProducto>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
