import { useEffect, useState } from 'react';
import './App.css';
import Container from './components/Container';
import Exibirtemperatura from './components/ExibirTemperatura';
import Cidades from './resource/cidades';
import { BsSunFill, BsSnow } from 'react-icons/bs';

function App() {
  const [select, setSelect] = useState('Selecione');
  const [geoLocation, setGeoLocation] = useState([]);
  const [temperatura, setTemperatura] = useState('--');

  useEffect(() => {
    const data = new Date();
    const horaAtual = data.getHours();

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geoLocation[0]}&longitude=${geoLocation[1]}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=auto`)
      .then(result => result.json())
      .then(data => {
        setTemperatura(data.hourly.temperature_2m[horaAtual]);
      })
      .catch(error => console.log(error))
  }, [geoLocation])

  function locAtual() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setGeoLocation([lat, lon]);
        return;
      });
    } else {
      return console.log("Geolocalização não é suportada por este navegador.");
    }
  }

  function seletorCidade(valor) {
    const cidadeSelecionada = Cidades.filter(city => city.Cidade === valor);
    if (cidadeSelecionada.length > 0) {
      const lat = cidadeSelecionada[0].Latitude;
      const lon = cidadeSelecionada[0].Longitude;
      setGeoLocation([lat, lon]);
    } else {
      console.log('Cidade não encontrada!')
    }
    return;
  }

  function handleSelect(event) {
    const value = event.target.value;
    setSelect(value);
    if (value === 'Localização atual') {
      locAtual();
    } else {
      seletorCidade(value);
    }
  }

  return (
    <Container temperatura={temperatura}>
      <Exibirtemperatura>
        {
          temperatura >= 20 ? <div className='icon'><BsSunFill /></div> : <div className='icon'><BsSnow /></div>
        }
      <h1>{temperatura}°C</h1>
      <h2>
        {
          select !== 'Selecione' ? select : 'Escolha a cidade'
        }
        </h2>
        <select value={select} onChange={handleSelect}>
          <option value='Selecione'>Selecionar localização</option>
          <option value='Localização atual'>Localização atual</option>
          {
            Cidades.map((cidade, index) => {
              return (
                <option key={index} value={cidade.Cidade}>{cidade.Cidade}</option>
              )
            })
          }
        </select>
      </Exibirtemperatura>
    </Container>
  );
}

export default App;
