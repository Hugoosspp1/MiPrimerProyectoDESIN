import { useEffect, useReducer } from 'react';
import './semaforo.css';

const estadoInicial = { luz: 'rojo', averiado: false, ciclos: 0 };

function reductor(estado, accion) {
  switch (accion.type) {
    case 'AVANZAR':
      if (estado.averiado) return estado;
      if (estado.luz === 'rojo') return { ...estado, luz: 'verde' };
      if (estado.luz === 'verde') return { ...estado, luz: 'ambar' };
      return { ...estado, luz: 'rojo', ciclos: estado.ciclos + 1 };
    case 'AVERIA':
      return { ...estado, luz: 'ambar', averiado: true };
    case 'REPARAR':
      return { ...estado, luz: 'rojo', averiado: false };
    case 'RESET':
      return { ...estadoInicial };
    default:
      throw Error('Acción desconocida');
  }
}

const duraciones = { rojo: 4000, verde: 3000, ambar: 1000 };

function Semaforo() {
  const [estado, dispatch] = useReducer(reductor, estadoInicial);

  useEffect(() => {
    if (estado.averiado) return undefined;
    const temporizador = setTimeout(() => dispatch({ type: 'AVANZAR' }), duraciones[estado.luz]);
    return () => clearTimeout(temporizador);
  }, [estado.luz, estado.averiado]);

  return (
    <section className="semaforo">
      <h1>Semáforo</h1>
      <div className="semaforo-carcasa" aria-label={`Semáforo: luz ${estado.luz}`}>
        {['rojo', 'ambar', 'verde'].map((luz) => (
          <div
            key={luz}
            className={`semaforo-luz ${luz} ${estado.luz === luz ? 'activa' : ''} ${estado.averiado && luz === 'ambar' ? 'parpadeo' : ''}`}
            aria-label={`${luz}${estado.luz === luz ? ', encendida' : ', apagada'}`}
          />
        ))}
      </div>
      <p className="semaforo-ciclos">Ciclos completados: {estado.ciclos}</p>
      <div className="semaforo-botones">
        <button onClick={() => dispatch({ type: 'AVANZAR' })}>AVANZAR</button>
        <button onClick={() => dispatch({ type: 'AVERIA' })}>AVERÍA</button>
        <button onClick={() => dispatch({ type: 'REPARAR' })}>REPARAR</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>RESET</button>
      </div>
    </section>
  );
}

export default Semaforo;
