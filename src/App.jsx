import NavbarComp from './components/navbar';
import { Routes } from 'react-router-dom';
import About from './pages/About';

function App() {
  return (
    <>
      <NavbarComp />
      <main>
        <Routes>
          <Route path="/about" element={<About />} />

        </Routes>
      </main>
      <footer>

      </footer>
    </>
  )
}
export default App
