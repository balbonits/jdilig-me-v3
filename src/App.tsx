import { BrowserRouter, Routes, Link } from 'react-router';
import { AppRoutes } from './router';

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Home Page</h1>
        <div className="flex gap-4 justify-center mt-4">
          <Link to="/about" className="text-blue-600 hover:text-blue-800 underline">
            About
          </Link>
          <Link to="/docs" className="text-blue-600 hover:text-blue-800 underline">
            Docs
          </Link>
          <Link to="/docs/wires" className="text-blue-600 hover:text-blue-800 underline">
            Wireframes
          </Link>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Page</h1>
        <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <AppRoutes />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
export { HomePage, AboutPage };
