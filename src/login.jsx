import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import usina from '../public/usina.jpg';

// Interceptor para adicionar o token a todas as requisições
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Token encontrado no localStorage:', token); // Adiciona um log para verificar se o token está presente
  } else {
    console.log('Token não encontrado no localStorage'); // Adiciona um log caso o token não seja encontrado
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const LoginPage = ({ setIsAuthenticated }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { usuario, senha });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      console.log('Login realizado com sucesso. Token obtido:', response.data.token); // Adiciona um log para verificar se o login foi bem-sucedido e o token obtido
      navigate('/selectPage');
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data?.msg || error.message);
    }
  };

  return (
    <div>
      <nav>
        <h1 className={styles.h1}>Nós Por Nós</h1>
      </nav>
      <img className={styles.usina} src={usina} alt="usina" />
      <div className={styles.login}>
        <form method="post" onSubmit={handleLogin}>
          <h2>Login</h2>
          <h3>Insira seus dados</h3>
          <label>Usuário</label>
          <input
            id='user'
            type='text'
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <label>Senha</label>
          <input
            id='password'
            type='password'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type='submit'>Entrar</button>
        </form>
      </div>
    </div>
  );
};

const testMovimentacao = async () => {
  const idDoacao = '6669ec71cb7a8c56704aadcc'; // Substitua pelo ID real da doação
  try {
    const response = await axios.put(`http://localhost:3000/moveDoacaoAceita/${idDoacao}`);
    console.log('Movimentação bem-sucedida:', response.data);
  } catch (error) {
    console.error('Erro ao mover o pedido:', error.response?.data?.msg || error.message);
  }
};

// Chame esta função após o login ou onde achar adequado para testar
testMovimentacao();

export default LoginPage;
