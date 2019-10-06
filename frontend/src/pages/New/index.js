import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import styles from './styles.css';
import api from '../../services/api';


export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  },
    [thumbnail]
  )

  async function handlerSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id }
    });

    history.push('/dashboard');
  }

  return (
    <>
      <form onSubmit={handlerSubmit}>

        <label
          id="thumbnail"
          style={{ backgroundImage: `url(${preview})` }}
          className={thumbnail ? 'has-thumbnail' : ''}
        >
          <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
          <img src={camera} alt="" />
        </label>

        <label htmlFor="company"> EMPRESA * </label>
        <input
          type="text"
          id="company"
          placeholder="Sua empresa incrível"
          value={company}
          onChange={event => setCompany(event.target.value)}
        />

        <label htmlFor="techs"> TECNOLOGIAS * <span>(separadas por vírgulas)</span></label>
        <input
          type="text"
          id="techs"
          placeholder="Quais tecnologias usa?"
          value={techs}
          onChange={event => setTechs(event.target.value)}
        />

        <label htmlFor="price"> VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
        <input
          type="text"
          id="price"
          placeholder="Valor cobrado por dia?"
          value={price}
          onChange={event => setPrice(event.target.value)}
        />
        <button className="btn" type="submit"> Cadastrar</button>
      </form>
    </>
  )
}