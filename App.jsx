import { useState } from 'react';
import Cronometro from './cronometro.jsx';
import { TemaContext } from './TemaContext.jsx';
import Semaforo from './componentes/semaforo/semaforo.jsx';
import FormularioAutoenfocado from './componentes/FormularioAutoenfocado/FormularioAuntoenfocado.jsx';

function App() {
  const [tema, setTema] = useState('claro');

  return (
    <TemaContext.Provider value={tema}>
      <main className={`app ${tema}`}>
        <button onClick={() => setTema(tema === 'claro' ? 'oscuro' : 'claro')}>
          Cambiar tema
        </button>
        <Cronometro /> 
        <Semaforo /> 
        <FormularioAutoenfocado />
      </main>
    </TemaContext.Provider>
  );
}

export default App;
