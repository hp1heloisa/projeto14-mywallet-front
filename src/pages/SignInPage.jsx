import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignInPage() {

  let [email, setEmail] = useState('');
  let [senha, setSenha] = useState('');
  const navigate = useNavigate();

  function logar(e) {
    e.preventDefault();
    const enter = {email, senha};
    axios.post(`${import.meta.env.VITE_API_URL}/login`, enter)
          .then(res => {
            localStorage.setItem('dadosMyWallet', JSON.stringify({nome: res.data.nome, token: res.data.token}));
            navigate('/home');
          })
          .catch(err => {
            console.log(err)
            alert(err.response.data)});
    console.log(enter);
  }

  return (
    <SingInContainer>
      <form onSubmit={e => logar(e)}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required data-test="email"/>
        <input placeholder="Senha" type="password" autocomplete="new-password" value={senha} onChange={e => setSenha(e.target.value)} required data-test="password"/>
        <button type="submit" data-test="sign-in-submit">Entrar</button>
      </form>

      <Link to={"/cadastro"} >
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
