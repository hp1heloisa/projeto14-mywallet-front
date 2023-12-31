import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"

export default function TransactionsPage() {

  let [valor, setValor] = useState('');
  let [descricao, setDescricao] = useState('');
  const {tipo} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let dados = JSON.parse(localStorage.getItem("dadosMyWallet"));
    if (!dados){
      navigate('/')
    }
  }, []);

  function novaTransacao(e) {
    e.preventDefault();
    let valorConverte = parseFloat(valor.replace(",","."));
    const transacao = {valor: valorConverte, descricao};
    let dados = JSON.parse(localStorage.getItem("dadosMyWallet"));
    axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${tipo}`, transacao, {headers: {Authorization: `Bearer ${dados.token}`}})
         .then(res => navigate('/home'))
         .catch(err => alert(err.response.data));
    console.log(transacao);
    console.log(tipo);
  }

  return (
    <TransactionsContainer>
      <h1>{(tipo == 'entrada') ? 'Nova entrada' : 'Nova saída'}</h1>
      <form onSubmit={e => novaTransacao(e)}>
        <input placeholder="Valor" type="text" value={valor} onChange={e => setValor(e.target.value)} required data-test="registry-amount-input"/>
        <input placeholder="Descrição" type="text" value={descricao} onChange={e => setDescricao(e.target.value)} required data-test="registry-name-input"/>
        <button type="submit" data-test="registry-save">{(tipo == 'entrada') ? 'Salvar entrada' : 'Salvar saída'}</button>
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
