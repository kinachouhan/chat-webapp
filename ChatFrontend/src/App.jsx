
import './App.css'
import { Home } from './components/Home'
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import { Login } from './components/Login'
import { SignUp } from './components/SignUp'
import  { Toaster } from 'react-hot-toast';




function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home/>
      )
    },
    {
      path: "/login",
      element: (
       <Login/>
      )
    },
    {
      path: "/signup",
      element: (
       <SignUp/>
      )
    }
  ])

  return (
    <>
    <Toaster position="top-right" />
    <RouterProvider router={router}/>
    </>
  )
}

export default App
