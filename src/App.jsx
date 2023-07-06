import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"

export default function App() {

  const REACT_APP_URL_API = "https://projeto14-mywallet-back-sxzk.onrender.com"

  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage REACT_APP_URL_API={REACT_APP_URL_API}/>} />
          <Route path="/cadastro" element={<SignUpPage REACT_APP_URL_API={REACT_APP_URL_API}/>} />
          <Route path="/home" element={<HomePage REACT_APP_URL_API={REACT_APP_URL_API} />} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage REACT_APP_URL_API={REACT_APP_URL_API} />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
