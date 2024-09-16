// import { ProfilePageArgsSchema } from "./react-router.types";

export const pathKeys = {
  root: "/",
  login: () => pathKeys.root.concat("login/"),
  register: () => pathKeys.root.concat("register/"),
  settings: () => pathKeys.root.concat("settings/"),
  home: () => pathKeys.root,
  page404: () => pathKeys.root.concat("404/"),
};

export const profilePathKeys = {
  root: () => pathKeys.root.concat("profile/"),
};

export const editorPathKeys = {
  root: () => pathKeys.root.concat("editor/"),
};
