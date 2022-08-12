import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PokeCard = () => {
  const [character, setCharacter] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setCharacter(res.data));
  }, [id]);
  console.log(character);
  return (
    <div>
      <h2>{character.name}</h2>
      <img src={character.sprites?.other.home.front_default} alt="" />
    </div>
  );
};

export default PokeCard;
