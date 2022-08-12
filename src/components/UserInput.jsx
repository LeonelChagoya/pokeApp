import React, { useState } from "react";
import { changeUser } from "../store/slices/user.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//4. importar y ejecutar useDispatch
const UserInput = () => {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    dispatch(changeUser(userName)); //guardamos y enviamos el valor de input
    navigate("/PokeDex");
  };
  //interfas de usuario
  return (
    <form className="formUser" onSubmit={submit}>
      <input
        type="text"
        value={userName} //se guarda el valor
        onChange={(e) => setUserName(e.target.value)}
      />
      <button> Submit</button>
    </form>
  );
};

export default UserInput;
