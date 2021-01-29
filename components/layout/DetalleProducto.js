import React from "react";
const DetalleProducto = ({ producto }) => {
  const {
    id,
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    urlimagen,
    votos,
  } = producto;
  console.log(producto);

  return (
    <li>
      <div>
        <div>
          <img src={urlimagen} />
        </div>
        <div>
          <h1>{nombre}</h1>
        </div>
      </div>
    </li>
  );
};

export default DetalleProducto;
