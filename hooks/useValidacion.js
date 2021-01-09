import React, { useState, useEffect } from "react";

const useValidacion = (stateInicial, validar, fn) => {
  //valores son los campos, inputs del formulario
  const [valores, guardarValores] = useState(stateInicial);
  const [errores, guardarErrores] = useState({});
  const [submitForm, guardarSubmitForm] = useState(false);

  //se cambia submitFrom de false a true para  que se
  //ejecute el useeffect para validar el formulario

  useEffect(() => {
    if (submitForm) {
      //si es == a 0 el objeto esta vacio
      const noErrores = Object.keys(errores).length === 0;

      if (noErrores) {
        fn(); //funcion que se ejecuta en el componente
      }
      guardarSubmitForm(false);
    }
  }, [errores]); //se pasa errores para que este revisando si hay errores
  //todo el tiempo

  //funcion que se ejecuta conforme el usuario escribe algos
  const handleChange = (e) => {
    guardarValores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  };

  //funcion que se ejecuta cuando el usuario hace submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
    guardarSubmitForm(true);
  };

  //validar onblur
  const handleBlur = () => {
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
  };

  return {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  };
};

export default useValidacion;
