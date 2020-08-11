import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars0.githubusercontent.com/u/37749585?s=460&u=9fc994d3394d6f5e183d6ba0937284e31313ab87&v=4" alt=""/>
        <div>
          <strong>Diego Fernandes</strong>
          <span>Quimica</span>
        </div>
      </header>

      <p>
        Entusista de quimica, aposdsidj idjskdlojsdlksj lksjdlk sjdlksjdlksjdl kjdlksjdslkdj lkdjsl kdjs lk
        <br /><br />
        ksjkdljskld dlksmica, aposdsidj idjskdlojsdlksj lksjdlk sjdlksjdlksjdl kjdlksjdslkdj lkdjsl kdjs lk
      </p>

      <footer>
        <p>
          Proço/hora
          <strong>R$ 90.00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem;