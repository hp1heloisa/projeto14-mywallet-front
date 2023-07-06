import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useState } from "react"

export default function SignUpPage({REACT_APP_URL_API}) {

  let [nome, setNome] = useState('');
  let [email, setEmail] = useState('');
  let [senha, setSenha] = useState('');
  let [confirma, setConfirma] = useState('');
  const navigate = useNavigate();

  function fazerCadastro(e) {
    e.preventDefault();
    if (senha != confirma){
      alert('As senhas devem ser iguais!');
    } else{
      const cadastro = {nome, email, senha};
      console.log(cadastro);
      axios.post(`${REACT_APP_URL_API}/cadastro`, cadastro)
            .then(res => navigate('/'))
            .catch(erro => alert(erro.response.data));
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={e => fazerCadastro(e)}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" value={nome} onChange={e => setNome(e.target.value)} required/>
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
        <input placeholder="Senha" type="password" autocomplete="new-password" value={senha} onChange={e => setSenha(e.target.value)} required/>
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" value={confirma} onChange={e => setConfirma(e.target.value)} required/>
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={"/"} >
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
