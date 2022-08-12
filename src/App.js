import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import Hero from "./pages/Hero"
import Power from "./pages/Power"
import CreateHero from "./pages/CreateHero";

const App = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/hero/:slug' element={<Hero/>}/>
      <Route path='/power/:slug' element={<Power/>}/>
      <Route path='/create-hero' element={<CreateHero/>}/>
      <Route />
      <Route />
    </Routes>
  </BrowserRouter>
  )
}

export default App;