import { useContext, useEffect, useState } from 'react';
import { TemaContext } from './TemaContext.jsx';

function Cronometro() {
  const [segundos, setSegundos] = useState(0);
  const [enMarcha, setEnMarcha] = useState(false);
  const tema = useContext(TemaContext);

  useEffect(() => {
    if (enMarcha) {
      const intervalo = setInterval(() => {
        setSegundos((actuales) => actuales + 1);
      }, 1000);

      return () => clearInterval(intervalo);
    }
  }, [enMarcha]);

  function reiniciar() {
    setEnMarcha(false);
    setSegundos(0);
  }

  return (
    <section className={`cronometro ${tema}`}>
      <h1>Cronómetro</h1>
      <p>{segundos} segundos</p>
      <button className="iniciar" onClick={() => setEnMarcha(true)}>
        Iniciar
      </button>
      <button onClick={() => setEnMarcha(false)}>Parar</button>
      <button onClick={reiniciar}>Reiniciar</button>
    </section>
  );
}

export default Cronometro;
