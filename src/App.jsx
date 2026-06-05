import NavbarComp from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Cats from './pages/Cats';
import Cart from './pages/Cart';
import CatDetails from './pages/CatDetails';

function App() {
  return (
    <>
      <NavbarComp />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/cat/:id" element={<CatDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>

      </main>
      <footer>

      </footer>
    </>
  )
}
export default App
