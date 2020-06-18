import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { LeafletMouseEvent} from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';

import ibgeApi from '../../services/ibge';
import api from '../../services/api';

import './style.scss'

interface IItem {
  id: number;
  title: string;
  image: string;
}

interface IBGEUFResponse {
  sigla: string
}

interface IBGECITYResponse {
  nome: string
}

const CreatePoint: React.FC = () => {
  const [uf, setUf] = useState<string>('0');
  const [city, setCity] = useState<string>('0');
  const [initialPosition, setInitialPosition] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [items, setItems] = useState<IItem[]>([]);
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [ufs, setUfs] = useState<string[]>([]);
  const [citys, setCitys] = useState<string[]>([]);
  const [itemsSelected, setItemsSelected] = useState<number[]>([]);

  const history = useHistory();

  useEffect(() => {
    getUfs();
    getItems();
    getPosition();
  }, []);

  useEffect(() => {
    getCitys()
  }, [uf]);

  async function getItems() {
    const { data } = await api.get('/items');
    setItems(data);
  };

  async function getUfs() {
    const { data } = await ibgeApi.get<IBGEUFResponse[]>('');
    setUfs(data.map(({ sigla }) => sigla));
  };

  async function getCitys() {
    const { data } = await ibgeApi.get<IBGECITYResponse[]>(`/${uf}/municipios`);
    setCitys(data.map((city) => city.nome));
  };

  function getPosition() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setInitialPosition([coords.latitude, coords.longitude])
    });
  }

  function toggleItemSelected(itemId: number) {
    const itemSelected = itemsSelected.findIndex(id => id === itemId);

    if (itemSelected >= 0) {
      const filteredItemsSelected = itemsSelected.filter(id => id !== itemId)
      setItemsSelected(filteredItemsSelected);
    } else {
      setItemsSelected([...itemsSelected, itemId])
    }
  };

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    setUf(event.target.value)
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    setCity(event.target.value)
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setMarker(event.latlng)
  }

  function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  function handleChangeWhatsapp(event: ChangeEvent<HTMLInputElement>) {
    setWhatsapp(event.target.value)
  }

  function handleChangeEmail(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  async function handleSubmit(event: FormEvent) {
    if (event) event.preventDefault();
    const {lat, lng} = marker;

    const data = {
      uf,
      city,
      name,
      whatsapp,
      email,
      items: itemsSelected,
      latitude: lat,
      longitude: lng,
    }

    await api.post('/points', data);

    alert('Ponto de coleta criado!!!')

    history.push('/');
  };

  return (
    <div id="page-create-point">
      <form onSubmit={handleSubmit}>
        <h1>Cadastro do <br/> ponto de coleta</h1>

        <fieldset>
          <legend><h2>Dados da entidade</h2></legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChangeName}
            />
          </div>

          <div className="field">
            <label htmlFor="name">Whatsapp</label>
            <input
              type="text"
              name="whatsapp"
              id="whatsapp"
              value={whatsapp}
              onChange={handleChangeWhatsapp}
            />
          </div>

          <div className="field">
            <label htmlFor="name">E-mail</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={handleChangeEmail}
            />
          </div>

          <Map center={initialPosition} zoom={13} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {marker && <Marker position={marker} />}
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado</label>

              <select name="uf" id="uf" value={uf} onChange={handleSelectedUf}>
                <option value="0">Selecione uma UF</option>
                {ufs.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>

              <select name="city" id="city" value={city} onChange={handleSelectedCity}>
                <option value='0'>Selecione uma Cidade</option>
                {citys.map((city) => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="adress">Endereço</label>
            <input
              type="text"
              name="adress"
              id="adress"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item: IItem) => {
              const itemSelected = itemsSelected.includes(item.id);

              return (
                <li className={itemSelected ? 'selected' : undefined} key={item.id} onClick={() => toggleItemSelected(item.id)}>
                  <img src={`${process.env.REACT_APP_API}/uploads/${item.image}`} alt="Teste"/>
                  <span>{item.title}</span>
                </li>
              )
            })}
          </ul>
        </fieldset>

        <button type="submit">
          Cadastrar ponto de coleta
        </button>
      </form>
    </div>
  );
}

export default CreatePoint;
