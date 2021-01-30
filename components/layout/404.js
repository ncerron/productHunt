import React from "react";
import { css } from "@emotion/react";

const Error404 = () => {
  return (
    <h1
      css={css`
        margin-top: 5rem;
        text-align: center;
      `}
    >
      El Producto no Existente
    </h1>
  );
};

export default Error404;
