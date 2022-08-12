import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PokeItem from "./PokeItem";

const PokeDex = () => {
  const user = useSelector((state) => state.user);

  const [characters, setCharacters] = useState([]);
  const [characterSearch, setCharacterSearch] = useState("");
  const [types, setTypes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154")
      .then((res) => setCharacters(res.data.results));

    axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res) => setTypes(res.data.results));
  }, []);

  const search = (e) => {
    e.preventDefault();

    navigate(`/PokeDex/${characterSearch}`);
  };

  const filterType = (e) => {
    e.preventDefault();
    axios.get(e.target.value).then((res) => setCharacters(res.data.pokemon));
  };

  //paginacion//
  const [page, setPage] = useState(1);
  const lastIndex = page * 12;
  const firstIndex = lastIndex - 12;
  const pokePagination = characters.slice(firstIndex, lastIndex);
  const lastPage = Math.ceil(characters.length / 12);

  const numbers = [];

  for (let i = 1; i <= lastPage; i++) {
    numbers.push(i);
  }

  console.log(numbers);
  return (
    <div>
      <p> Bienvenido {user}</p>
      <form onSubmit={search}>
        <input
          type="text"
          value={characterSearch}
          onChange={(e) => setCharacterSearch(e.target.value)}
        />
        <button>Search</button>
      </form>
      <select onChange={filterType}>
        <option value="">Selecciona </option>
        {types.map((type) => (
          <option value={type.url} key={type.url}>
            {type.name}{" "}
          </option>
        ))}
      </select>
      <ul>
        {pokePagination.map((character) => (
          <PokeItem
            characterUrl={
              character.url ? character.url : character.pokemon?.url
            }
            key={character.url ? character.url : character.pokemon?.url}
          />
        ))}
      </ul>
      <div className="pagination" >
        <button
          className="bt-pag"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <i className="fi fi-sr-arrow-circle-left"></i>
        </button>
        {numbers.map((number) => (
          <button className="bt-pag" onClick={() => setPage(number)}>
            {number}
          </button>
        ))}
        <button
          className="bt-pag"
          onClick={() => setPage(page + 1)}
          disabled={page === lastPage}
        >
          <i className="fi fi-ss-arrow-circle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default PokeDex;
