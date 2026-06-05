import NavbarComp from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';

function App() {
  return (
    <>
      <NavbarComp />
      <main>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />

        </Routes>
      </main>
      <footer>

      </footer>
    </>
  )
}
export default App
