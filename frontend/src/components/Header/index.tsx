import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiLogIn, FiArrowLeft } from 'react-icons/fi';

import logo from '../../images/logo.svg';

import './style.scss'

interface IProps {
  title?: string;
}

const Header: React.FC<IProps> = () => {
  const { pathname } = useLocation();
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="Ecoleta"/>
      </Link>
      
      <div>
        {pathname !== '/' ? (
          <Link to="/">
            <span><FiArrowLeft size="22" /></span>
            <strong>Voltar para home</strong>
          </Link>
        ) : (
          <Link to="/cadastro">
            <span><FiLogIn size="22" /></span>
            <strong>Cadastre um ponto de coleta</strong>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;