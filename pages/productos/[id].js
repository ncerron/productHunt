import React, { useEffect, useContext, useState, Fragment } from "react";
import { useRouter } from "next/router";

import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { Campo, InputSubmit } from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";
import { roundToNearestMinutes } from "date-fns";

const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

//npm run dev

const Producto = () => {
  //state del componente
  const [producto, guardarProducto] = useState({});
  const [error, guardarError] = useState(false);
  const [comentario, guardarComentario] = useState({});
  const [consultaDB, guardarConsultaDB] = useState(true);

  //routing para obtener el id actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //context de firebase
  const { firebase, usuario } = useContext(FirebaseContext);
  useEffect(() => {
    if (id && consultaDB) {
      const obtenerProducto = async () => {
        const productoQuery = await firebase.db.collection("productos").doc(id);
        const producto = await productoQuery.get();
        if (producto.exists) {
          guardarProducto(producto.data());
          guardarConsultaDB(false);
        } else {
          guardarError(true);
          guardarConsultaDB(false);
        }
      };
      obtenerProducto();
    }
  }, [id]);

  if (Object.keys(producto).length === 0 && !error) return "Cargando";
  const {
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    urlimagen,
    voto,
    creador,
    haVotado,
  } = producto;

  //administrar y validar los votos
  const votarProducto = () => {
    if (!usuario) {
      return router.push("/login");
    }

    //obtener y sumar votos
    const nuevoTotal = voto + 1;

    //verificar si el usuario actual ha votado
    if (haVotado.includes(usuario.uid)) return;

    //guardar id del usuario que ha votado
    const nuevoHaVotado = [...haVotado, usuario.uid];

    //actualizar en la bd
    firebase.db
      .collection("productos")
      .doc(id)
      .update({ voto: nuevoTotal, haVotado: nuevoHaVotado });
    //actualizar el state
    guardarProducto({
      ...producto,
      voto: nuevoTotal,
    });
    guardarConsultaDB(true); //consulta a la bd al votar
  };

  //funciones para crear comentario
  const comentarioChange = (e) => {
    guardarComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  const agregarComentario = (e) => {
    e.preventDefault();

    //informacion extra al comentario
    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    //tomar copia de comentario y agregarlo al arreglo
    const nuevosComentarios = [...comentarios, comentario];

    //acutalizar la bd
    firebase.db.collection("productos").doc(id).update({
      comentarios: nuevosComentarios,
    });

    //actualizar el state
    guardarProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });
    guardarConsultaDB(true);
  };

  //funcion que revisa que el creador del prodcuto sea el mismo
  //que esta autenticado
  const puedeBorrar = () => {
    if (!usuario) return false;

    if (creador.id === usuario.uid) {
      return true;
    }
  };

  //elimina un producto de la base de datos
  const eliminarProducto = async () => {
    if (!usuario) {
      return router.push("/login");
    }
    if (creador.id !== usuario.uid) {
      return router.push("/");
    }
    try {
      await firebase.db.collection("productos").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <>
        {error && <Error404 />}
        <div className="contenedor">
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            {nombre}
          </h1>
          <ContenedorProducto>
            <div>
              <p>
                Publicado hace:
                {formatDistanceToNow(new Date(creado), { locale: es })}
              </p>
              <p>
                Por: {creador.nombre} de {empresa}
              </p>
              <img src={urlimagen} />
              <p>{descripcion}</p>

              {usuario && (
                <>
                  <h2>Agrega tu comentario</h2>
                  <form onSubmit={agregarComentario}>
                    <Campo>
                      <input
                        type="text"
                        name="mensaje"
                        onChange={comentarioChange}
                      ></input>
                    </Campo>
                    <InputSubmit type="submit" value="Agregar Comentario" />
                  </form>
                </>
              )}

              <h2
                css={css`
                  margin: 2rem 0;
                `}
              >
                Comentarios
              </h2>
              {comentarios.length === 0 ? (
                "Aún no hay comentarios"
              ) : (
                <ul>
                  {comentarios.map((comentario, i) => (
                    <li
                      key={`$(comentario.usuarioId)-${i}`}
                      css={css`
                        border: 1px solid #e1e1e1;
                        padding: 2rem;
                      `}
                    >
                      <p>{comentario.mensaje}</p>
                      <p>Escrito por: {comentario.usuarioNombre}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <aside>
              <div
                css={css`
                  margin: 5rem;
                `}
              >
                <Boton target="_blank" bgColor="true" href={url}>
                  Visitar URL
                </Boton>

                <p
                  css={css`
                    text-align: center;
                  `}
                >
                  {voto} Votos
                </p>
                {usuario && <Boton onClick={votarProducto}>Votar</Boton>}
              </div>
            </aside>
          </ContenedorProducto>
          {puedeBorrar() && (
            <Boton onClick={eliminarProducto}>Eliminar Producto</Boton>
          )}
        </div>
      </>
    </Layout>
  );
};

export default Producto;
