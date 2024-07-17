import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SolicitarDoacao from './solicitarDoacao';
import RecebidosPage from './recebidos';
import LoginPage from './login';
import SelectPage from './selectPage';
import SepararPage from './Separador'

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className='main'>
        <Routes>
          <Route path='/' element={<SolicitarDoacao />} />
          <Route path='/pedidos' element={<PrivateRoute><RecebidosPage /></PrivateRoute>} />
          <Route path='/login' element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/selectPage' element={<PrivateRoute><SelectPage /></PrivateRoute>} />
          <Route path='/separarPage' element={<PrivateRoute><SepararPage/></PrivateRoute>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
