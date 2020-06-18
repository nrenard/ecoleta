import React from 'react';
import { FiSearch } from 'react-icons/fi';

import './style.css'

const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="content">
        <main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

          <a href="/search">
            <span><FiSearch /></span>
            <strong>Pesquisar pontos de coleta</strong>
          </a>
        </main>
      </div>
    </div>
  );
}

export default Home;