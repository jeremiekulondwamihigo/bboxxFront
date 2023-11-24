import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.jsx";
import { BrowserRouter } from "react-router-dom";
import Context from "./Context.jsx";
import moment from "moment"
import "bootstrap/dist/css/bootstrap.min.css"


moment.locale('fr', {
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: ' un an',
    yy: '%d ans',
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context>
        <Provider store={store}>
          <App />
        </Provider>
      </Context>
    </BrowserRouter>
  </React.StrictMode>
);
