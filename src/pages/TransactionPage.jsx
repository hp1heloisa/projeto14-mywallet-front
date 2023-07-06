import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"

export default function TransactionsPage({REACT_APP_URL_API}) {

  let [valor, setValor] = useState('');
  let [descricao, setDescricao] = useState('');
  const parametro = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let dados = JSON.parse(localStorage.getItem("dadosMyWallet"));
    if (!dados){
      navigate('/')
    }
  }, []);

  function novaTransacao(e) {
    e.preventDefault();
    const transacao = {valor, descricao};
    let dados = JSON.parse(localStorage.getItem("dadosMyWallet"));
    axios.post(`${REACT_APP_URL_API}/nova-transacao/${parametro.tipo}`, transacao, {headers: {Authorization: `Bearer ${dados.token}`}})
         .then(res => navigate('/home'))
         .catch(err => alert(err.response.data));
    console.log(transacao);
    console.log(parametro);
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={e => novaTransacao(e)}>
        <input placeholder="Valor" type="text" value={valor} onChange={e => setValor(e.target.value)} required/>
        <input placeholder="Descrição" type="text" value={descricao} onChange={e => setDescricao(e.target.value)} required/>
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
