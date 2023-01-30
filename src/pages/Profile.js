import React from "react";
import { useParams } from "react-router-dom";


export default function Profile() {
    const {name}=useParams(); 
    console.log(name)
  return (
    <div>
      <p>Desde Profile con el nombre de {name}</p>
    </div>
  );
}
