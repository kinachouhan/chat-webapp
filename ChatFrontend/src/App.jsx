
import './App.css'
import { Home } from './components/Home'
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import { Login } from './components/Login'
import { SignUp } from './components/SignUp'




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
      <RouterProvider router={router}/>
  )
}

export default App
