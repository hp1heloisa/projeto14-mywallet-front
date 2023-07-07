import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"

export default function TransactionsPage() {

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
    axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${parametro.tipo}`, transacao, {headers: {Authorization: `Bearer ${dados.token}`}})
         .then(res => navigate('/home'))
         .catch(err => alert(err.response.data));
    console.log(transacao);
    console.log(parametro);
  }

  return (
    <TransactionsContainer>
      <h1>{(parametro.tipo == 'entrada') ? 'Nova entrada' : 'Nova saída'}</h1>
      <form onSubmit={e => novaTransacao(e)}>
        <input placeholder="Valor" type="text" value={valor} onChange={e => setValor(e.target.value)} required data-test="registry-amount-input"/>
        <input placeholder="Descrição" type="text" value={descricao} onChange={e => setDescricao(e.target.value)} required data-test="registry-name-input"/>
        <button type="submit" data-test="registry-save">{(parametro.tipo == 'entrada') ? 'Salvar entrada' : 'Salvar saída'}</button>
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
