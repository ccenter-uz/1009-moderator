// src/app/App.tsx;
import { Provider } from "react-redux";

import { store } from "./store";
import SideBar from "./ui/sidebar";

import "./main.css";

const App = () => (
  <Provider store={store}>
    <SideBar />
  </Provider>
);

export default App;
