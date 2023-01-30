import React, { useState, useEffect } from "react";

export default function Welcome(props) {
  const [counter, setCounter] = useState(0);
  const [semaforo, setSemaforo] = useState(false);
  const { message, name } = props;

  useEffect(() => {
    console.log(semaforo)
  }, [semaforo]);

  const contar = () => {
    setCounter(counter + 1);
    setSemaforo(!semaforo);
  };

  return (
    <div>
      <h1>Hola, {name}</h1>
      <h2>Contador de react con hooks</h2>
      <p>{message}</p>
      <h4>El numero del contador es {counter}</h4>
      <p>El semaforo esta en color {semaforo ? "red" : "green"}</p>
      {/* <><button type="submit" onClick={() => setCounter(counter+1)}>Sumar Contador</button></> */}
      <>
        <button type="submit" onClick={contar}>
          Sumar Contador
        </button>
      </>
    </div>
  );
}
