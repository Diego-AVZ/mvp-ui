import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Funds from './pages/Funds';
import Strategies from './pages/Strategies';
import BundleBuilder from './pages/BundleBuilder';
import DeFiGraph from './pages/DeFiGraph';
import DeFiChart from './pages/TradingChart';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router basename="/mvp-ui">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/funds" element={<Layout><Funds /></Layout>} />
          <Route path="/bundles" element={<Layout><Strategies /></Layout>} />
          <Route path="/bundles/builder" element={<Layout><BundleBuilder /></Layout>} />
          <Route path="/graph" element={<Layout><DeFiGraph /></Layout>} />
          <Route path="/chart" element={<Layout><DeFiChart /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;