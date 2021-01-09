/* function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp; */

import App from "next/app";
import { Component } from "react";
import firebase, { FirebaseContext } from "../firebase";

const MyApp = (props) => {
  const { Component, pageProps } = props;

  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};
export default MyApp;
