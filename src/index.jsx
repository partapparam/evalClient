import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./app/App"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import { store } from "./common/store"
import Radar from "radar-sdk-js"

Radar.initialize(process.env.REACT_APP_RADAR_PUBLISHABLE_KEY)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
