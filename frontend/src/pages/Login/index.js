import React, { useState, history } from 'react';
import api from '../../services/api';

export default function Login({ history }) {

  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await api.post('/session', {
      email
    });

    const { _id } = response.data;
    localStorage.setItem('user', _id);

    // redirect the user to another page 
    history.push('/dashboard');
  }

  return (
    <>
      <p>
        Ofereça <b>spots</b> para programadores e encontre <b>talentos</b> para sua empresa
    </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          type="email"
          id="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <button className="btn" type="submit"> Entrar</button>
      </form>
    </>
  );
}