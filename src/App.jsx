import {BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "./pages/Home"
import Detail from "./pages/Detail"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path="/" />
        <Route element={<Detail/>} path="/detail/:id" />
      </Routes>
    </BrowserRouter>
  )
}

export default App