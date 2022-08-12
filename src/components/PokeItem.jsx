import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PokeItem = ({ characterUrl }) => {
  const [character, setCharacter] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    axios.get(characterUrl).then((res) => setCharacter(res.data));
  }, []);

  return (
    <div onClick={() => navigate(`/PokeDex/${character.id}`)}>
      <img src={character.sprites?.other.home.front_default} alt="" />
      <h2>{character.name}</h2>
      <div>
        <h5>
          {" "}
          {character.types?.[0]?.type.name}/{character.types?.[1]?.type.name}{" "}
        </h5>
        <span>Type</span>
      </div>
      <div>
        <p>HP</p>
        <p>{character.stats?.[0]?.base_stat}</p>
      </div>
      <div>
        <p>attack</p>
        <p>{character.stats?.[1]?.base_stat}</p>
      </div>
      <div>
        <p>defense</p>
        <p>{character.stats?.[2]?.base_stat}</p>
      </div>
      <div>
        <p>speed</p>
        <p>{character.stats?.[5]?.base_stat}</p>
      </div>
    </div>
  );
};

export default PokeItem;
