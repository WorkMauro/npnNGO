import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Separar.module.css'

const Separador = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3000/doacaoAceita')
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados:', error);
        });
    }, []);

    const handleAccept = async (id) => {
      try {
        const response = await axios.put(`http://localhost:3000/moveDoacaoFinalizada/${id}`);
        console.log("Pedido movido com sucesso:", response.data);
        setData(data.filter(item => item._id !== id));
      } catch (error) {
        console.error("Erro ao mover o pedido:", error);
      }
    };

    const whatsappAprovado = (id) => {
      const item = data.find(item => item._id === id);
      if (item) {
        const str = item.whatsapp;
        const message = 'https://api.whatsapp.com/send?phone=' + str + '&text=Seu%20pedido%20esta%20pronto%20para%20retirada';
        return message;
      } else {
        console.log("Deu ruim");
        return '#';
      }
    };

    return (
      <div className={styles.main}>
        <h1>Pedidos Recebidos</h1>
        <ul>
          {Array.isArray(data) && data.map((item) => (
            <li className={styles.lista} key={item._id}>
              <p> Número de Pessoas: {item.numeroPessoas}</p>
              <p> Kit Higiene: {item.kitHigiene}</p>
              <p> Água: {item.agua}</p>
              <p> Alimentos: {item.alimentos}</p>
              <p> Roupas: {item.roupas}</p>
              <p> Produtos de Limpeza: {item.prodLimp}</p>
              <p> Nome: {item.nome}</p>
              <p> Whatsapp: {item.whatsapp}</p>
              <p> Endereço Afetado: {item.endAfe}</p>
              <p> Endereço Atual: {item.endAtu}</p>
              <button
                className={styles.acceptButton}
                onClick={() => {
                  handleAccept(item._id);
                  const whatsappLink = whatsappAprovado(item._id);
                  window.open(whatsappLink, '_blank');
                }}
              >
                Finalizar
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default Separador;
