import React from 'react'

import './GlobalStyle.css'

import Logo from './assets/logo.svg'

import BalanceSection from './components/BalanceSection'
import TransactionSection from './components/TransactionSection'
import Modal from './components/Modal'


function App() {
  return (
    <>
        <header>
            <img src={Logo} alt="Logo" id="logo" />
        </header>

        <main className='container'>
            <>
              <BalanceSection />
            </>
            <>
              <TransactionSection />
            </>
        </main>

        <>
          <Modal />
        </>

        <footer>
          <p>dev.finance$</p>
        </footer>
    </>
  );
}




export default App;
