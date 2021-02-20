import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";

import DetalleProducto from "../components/layout/DetalleProducto";
import useProductos from "../hooks/useProductos";
import { useEffect, useState } from "react";

const Buscar = () => {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  //todos los productos
  const { productos } = useProductos("creado");
  const [resultado, guardarResultado] = useState([]);

  useEffect(() => {
    const busqueda = q.toLocaleLowerCase();
    const filtro = productos.filter((producto) => {
      return (
        producto.nombre.toLocaleLowerCase().includes(busqueda) ||
        producto.descripcion.toLocaleLowerCase().includes(busqueda)
      );
    });
    guardarResultado(filtro);
  }, [q, productos]);

  return (
    <div>
      <Layout>
        <div className="listado-producto">
          <div className="bg-white">
            {resultado.map((producto) => (
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

export default Buscar;
