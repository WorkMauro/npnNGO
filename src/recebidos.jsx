import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './recebidos.module.css';

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  } return config;
}, (error) => { return Promise.reject(error);});

const RecebidosPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  const handleAccept = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/moveDoacaoAceita/${id}`
      );
      console.log("Pedido movido com sucesso:", response.data);
      setData(data.filter(item => item._id !== id)); 
    } catch (error) {
      console.error("Erro ao mover o pedido:", error);
      console.log("Status:", error.response.status); // Log do status da resposta
      console.log("Data:", error.response.data);     // Log dos dados da resposta
    }
  };
  
  const handleReject = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/moveDoacaoRejeitada/${id}`
      );
      console.log("Pedido movido com sucesso:", response.data);
      setData(data.filter(item => item._id !== id)); 
    } catch (error) {
      console.error("Erro ao mover o pedido:", error);
      console.log("Status:", error.response.status); // Log do status da resposta
      console.log("Data:", error.response.data);     // Log dos dados da resposta
    }
  };

  const whatsappAprovado = (id) => {
    const item = data.find(item => item._id === id);
    if (item) {
      const str = item.whatsapp;
      const message = 'https://api.whatsapp.com/send?phone=' + str + '&text=Seu%20pedido%20foi%20aprovado%20e%20passado%20para%20separação';
      return message;
    } else {
      console.log("Deu ruim");
      return '#';
    }
  };

  const whatsappNegado = (id) => {
    const item = data.find(item => item._id === id);
    if (item) {
      const str = item.whatsapp;
      const link = 'https://api.whatsapp.com/send?phone=' + str + '&text=Seu%20pedido%20não%20foi%20aprovado';
      return link;
    } else {
      console.log("Deu ruim");
      return '#';
    }
  };

  return (
    <div className={styles.main}>
      <h1>Pedidos Recebidos</h1>
      <div className={styles.pedidos}>
        <ul>
          {data.map((item) => (
            <li className={styles.lista} key={item._id}>
              <p>Número de Pessoas: {item.numeroPessoas}</p>
              <p>Kit Higiene: {item.kitHigiene}</p>
              <p>Água: {item.agua}</p>
              <p>Alimentos: {item.alimentos}</p>
              <p>Roupas: {item.roupas}</p>
              <p>Produtos de Limpeza: {item.prodLimp}</p>
              <p>Nome: {item.nome}</p>
              <p>Whatsapp: {item.whatsapp}</p>
              <p>Endereço Afetado: {item.endAfe}</p>
              <p>Endereço Atual: {item.endAtu}</p>
              <a className={styles.link} href={item.image_url} target='_blank' rel='noopener noreferrer'>Ver Comprovante</a>
              <button
                className={styles.acceptButton}
                onClick={() => {
                  handleAccept(item._id);
                  const whatsappLink = whatsappAprovado(item._id);
                  window.open(whatsappLink, '_blank');
                }}
              >
                Aceitar
              </button>
              <button
                className={styles.rejectButton}
                onClick={() => {
                  handleReject(item._id);
                  const whatsappLink = whatsappNegado(item._id);
                  window.open(whatsappLink, '_blank');
                }}
              >
                Rejeitar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecebidosPage;
