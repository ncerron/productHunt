import React from "react";
import Layout from "../components/layout/Layout";
import DetalleProducto from "../components/layout/DetalleProducto";
import useProductos from "../hooks/useProductos";

const Populares = () => {
  const { productos } = useProductos("voto");
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

export default Populares;
