import {BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "./pages/Home"
import Detail from "./pages/Detail"
import Login from "./pages/Login"
import Bookmark from "./pages/Bookmark"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path="/" />
        <Route element={<Login />} path="/auth/login"  />
        <Route element={<Bookmark />} path="/bookmark"  />
        <Route element={<Detail/>} path="/detail/:id" />
      </Routes>
    </BrowserRouter>
  )
}

export default App