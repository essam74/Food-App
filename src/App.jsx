import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AuthLayout from "./modules/SharedModule/components/AuthLayout/AuthLayout";
import Notfound from "./modules/SharedModule/components/Notfound/Notfound";
import MasterLayout from "./modules/SharedModule/components/MasterLayout/MasterLayout";
import Dashboard from "./modules/HomeModule/components/Dashboard/Dashboard";
import UsersList from "./modules/UsersModule/components/UsersList/UsersList";
import CategoriesList from "./modules/CategoriesModule/components/CategoriesList/CategoriesList";
import RecipesList from "./modules/RecipesModule/components/RecipesList/RecipesList";
import Login from "./modules/AuthenticationModule/components/login/Login";
import ForgetPass from "./modules/AuthenticationModule/components/forgetpass/ForgetPass";
import Register from "./modules/AuthenticationModule/components/register/Register";
import ResetPass from "./modules/AuthenticationModule/components/resetpass/ResetPass";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/SharedModule/ProtectedRoute/ProtectedRoute";

function App() {

  let [loginData , setLoginData] = useState(null)
  let saveLoginData = ()=>{
    let encodedToken = localStorage.getItem('token')
    let decodedToken = jwtDecode(encodedToken)
    setLoginData(decodedToken);
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      saveLoginData()
    }

  }, [])

  const routes = createBrowserRouter([
    {
      path: "dashboard",
      element:( <ProtectedRoute>
         <MasterLayout loginData={loginData} /> 
      </ProtectedRoute>),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "users", element: <UsersList /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "forgetpass", element: <ForgetPass /> },
        { path: "resetpass", element: <ResetPass /> },
      ],
    },
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
