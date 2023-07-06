import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function HomePage({REACT_APP_URL_API}) {

  let [nome, setNome] = useState('');
  let [transacoes, setTransacoes] = useState([]);
  let total = 0;
  const navigate = useNavigate();

  useEffect(() => {
    let dados = JSON.parse(localStorage.getItem("dadosMyWallet"));
    console.log(dados);
    if (dados){
      setNome(dados.nome);
      axios.get(`${REACT_APP_URL_API}/transacoes`, {headers: {Authorization: `Bearer ${dados.token}`}})
           .then(res => {
              setTransacoes(res.data);
              console.log(transacoes);
           })
           .catch(err => console.log(err));
    } else {
      navigate('/')
    }
  }, []);

  function sair(){
    localStorage.removeItem("dadosMyWallet");
    navigate('/');
  }

  if (transacoes.length > 0){ 
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {nome}</h1>
        <BiExit onClick={() => sair()}/>
      </Header>
      <TransactionsContainer>
        <ul>
          {transacoes.map(transacao => {
              if (transacao.tipo == 'entrada'){
                total += Number(transacao.valor);
              } else{
                total -= Number(transacao.valor);
              }
            return( 
              <ListItemContainer>
                <div>
                  <span>{transacao.data}</span>
                  <strong>{transacao.descricao}</strong>
                </div>
                <Value color={transacao.tipo}>{Number(transacao.valor).toFixed(2).replace(".", ",")}</Value>
              </ListItemContainer>
            )
          })}
        </ul>
        <article>
          <strong>Saldo</strong>
          <Value color={total>=0 ? 'entrada' : ''}>{total.toFixed(2).replace(".", ",")}</Value>
        </article>
      </TransactionsContainer>
      <ButtonsContainer>
        <button onClick={() => navigate('/nova-transacao/entrada')}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate('/nova-transacao/saida')}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  )
  } else{ 
    return(
    <HomeContainer>
      <Header>
        <h1>Olá, {nome}</h1>
        <BiExit onClick={() => sair()}/>
      </Header>
      <TransactionsContainer>
        <DivSem>
         <span>Não há registros de</span> 
         <span>entrada ou saída</span>
        </DivSem>
      </TransactionsContainer>
      <ButtonsContainer>
        <button onClick={() => navigate('/nova-transacao/entrada')}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate('/nova-transacao/saida')}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
    )
  }
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul {
    overflow: scroll;
    height: 388px;
  }
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
const DivSem = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #868686;
`