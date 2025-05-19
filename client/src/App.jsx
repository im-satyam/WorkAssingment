// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Agent from './pages/Agent';
import D2 from './pages/D2';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AddSubAgent from './pages/SAgent';
import SView from './pages/SView';
import View from './pages/View';
function App() {
  return (
    <>
    <Header/>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/subagent" element={<AddSubAgent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/viewagent" element={<View />} />
        <Route path="/viewsubagent" element={<SView />} />
        <Route path="/agentdashboard" element={<D2 />} />
      </Routes>
    </BrowserRouter>
    <Footer/>
  </>
  );
}

export default App;
