import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Repo, Home } from './pages';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":repoId" element={<Repo />} />
      </Routes>
    </BrowserRouter>
  );
}
