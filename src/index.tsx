import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Home from "./routes/home";
import Help from "./routes/help";
import Signup from './routes/signup';
import Signin from './routes/signin';
import Logout from "./routes/logout";
import Mypage from "./routes/mypage";

import PrivateRoute from "./utils/privateRoute";
import PublicRoute from "./utils/publicRoute";
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/help",
    element: <Help />
  },
  {
    path: "/signup",
    element: 
      <PublicRoute>
        <Signup />
      </PublicRoute>
  },
  {
    path: "/signin",
    element: 
      <PublicRoute>
        <Signin />
      </PublicRoute>
  },
  {
    path: "/mypage",
    element:
    <PrivateRoute>
      <Mypage />
    </PrivateRoute>
  },
  {
    path: "/logout",
    element: 
      <PrivateRoute>
        <Logout />
      </PrivateRoute>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
