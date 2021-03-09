import React from "react";

const Login = React.lazy(() => import("src/pages/Login"));
const Main = React.lazy(() => import("src/pages/Main"));

export { Login, Main };
