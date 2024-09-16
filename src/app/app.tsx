import { useTranslation, Trans } from "react-i18next";
import { Provider } from "react-redux";

import "./i18n/config";
import { store } from "./store";
import MainLayout from "./ui/layout";

import "./main.css";

const App = () => {
  // const { t } = useTranslation();

  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
};

export default App;
