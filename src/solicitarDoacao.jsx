import React, { useState } from 'react';
import axios from 'axios';
import styles from './solicitarDoacao.module.css';
import logo from '../public/npn.png';
import bandeira from '../public/bandeiraNova.jpg';
import imgQG from '../public/imgQG.jpg';

<script src="https://unpkg.com/scrollreveal"></script>

const App = () => {
  const [form, setForm] = useState({
    numeroPessoas: '',
    kitHigiene: '',
    agua: '',
    alimentos: '',
    roupas: '',
    prodLimp: '',
    nome: '',
    whatsapp: '',
    endAfe: '',
    endAtu: '',
    image_url: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    let isValid = true;
    for (const key in form) {
      if (form[key] === "") {
        alert("Pedido não foi enviado, favor preencher todos os campos");
        isValid = false;
        break;
      }
      formData.append(key, form[key]);
    }
    if (isValid) {
      axios.post('http://localhost:3000/', formData)
        .then((res) => {
          console.log(res.data);
          alert("Pedido Enviado");
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao enviar o pedido");
        });
    }
  };
  

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  };

  return (
    <div className={styles.main}>
      <nav className={styles.navbar}>
        <p className={styles.npn}>Nós por Nós</p>
      </nav>
      <div className={styles.containerLogo}>
        <img className={styles.bandeira} src={bandeira} alt="bandeira" />
        <img className={styles.alxLogo} src={logo} alt="Logo" />
      </div>
      <section className={styles.formDoacao}>
        <form onSubmit={handleSubmit}>
          <p>Primeiro, vamos coletar algumas informações sobre o pedido</p>
          <label htmlFor="numeroPessoas">São Quantas Pessoas?</label>
          <input id="numeroPessoas" type="number" value={form.numeroPessoas} onChange={handleChange} />
          <label htmlFor="kitHigiene">Precisa de Kit Higiene?</label>
          <input id="kitHigiene" type="text" value={form.kitHigiene} onChange={handleChange} />
          <label htmlFor="agua">Precisa De Água?</label>
          <input id="agua" type="text" value={form.agua} onChange={handleChange} />
          <label htmlFor="alimentos">Precisa de Alimentos?</label>
          <input id="alimentos" type="text" value={form.alimentos} onChange={handleChange} />
          <label htmlFor="roupas">Precisa de Roupas?</label>
          <input id="roupas" type="text" value={form.roupas} onChange={handleChange} />
          <label htmlFor="prodLimp">Precisa de Produtos de Limpeza?</label>
          <input id="prodLimp" type="text" value={form.prodLimp} onChange={handleChange} />
          <p>Agora, precisamos de informações sobre você</p>
          <label htmlFor="nome">Nome</label>
          <input id="nome" type="text" value={form.nome} onChange={handleChange} />
          <label htmlFor="whatsapp">Qual seu Whatsapp?</label>
          <input id="whatsapp" type="number" value={form.whatsapp} onChange={handleChange} />
          <label htmlFor="endAfe">Qual endereço afetado você informou no comprovante?</label>
          <input id="endAfe" type="text" value={form.endAfe} onChange={handleChange} />
          <label htmlFor="endAtu">Em que endereço você se encontra agora?</label>
          <input id="endAtu" type="text" value={form.endAtu} onChange={handleChange} />
          <label htmlFor="image_url">Envie o comprovante de residência do endereço afetado</label>
          <input id="image_url" type="file" onChange={(e) => setForm({ ...form, image_url: e.target.files[0] })} />
          <button type="submit">Solicitar Doação</button>
        </form>
        <img className={styles.imgQG} src={imgQG} alt="imgQG" />
      </section>
    </div>
  );
};

export default App;
