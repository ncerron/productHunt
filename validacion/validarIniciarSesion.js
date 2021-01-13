export default function validarIniciarSesion(valores) {
  let errores = {};

  //validar email
  if (!valores.email) {
    errores.email = "El email es obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "Email no válido";
  }

  //validar password
  if (!valores.password) {
    errores.password = "El password es obligatorio";
  } else if (valores.password.length < 6) {
    //firebase pide que el password tenga al menos 6 caracteres
    errores.password = "El password tiene que ser de al menos 6 caracteres";
  }

  return errores;
}
