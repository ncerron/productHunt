export default function validarCrearCuenta(valores) {
  let errores = {};
  //validar usuario
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }

  //validar empresa
  if (!valores.empresa) {
    errores.empresa = "Nombre de Empresa es obligatorio";
  }

  //validar url
  if (!valores.url) {
    errores.url = "La URL es obligatorio";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "URL mal formateada o no válida";
  }

  //validar descripticon
  if (!valores.descripcion) {
    errores.descripcion = "Agrega una descripción de tu producto";
  }

  return errores;
}
