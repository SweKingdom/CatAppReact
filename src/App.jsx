import NavbarComp from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Cats from './pages/Cats';
import Cart from './pages/Cart';

function App() {
  return (
    <>
      <NavbarComp />
      <main>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/cart" element={<Cart />} />


        </Routes>
      </main>
      <footer>

      </footer>
    </>
  )
}
export default App
