import React from 'react'

import './style.css'

import income from '../../assets/income.svg'
import expense from '../../assets/expense.svg'
import total from '../../assets/total.svg'

export default function BalanceSection(){
	return (
		<section id='balance'>
			<h2 className='screenreader-only'>Balanço</h2>

			<div className='card'>
				<h3>Entradas</h3>

				<div>
					<p id='incomes-display'>R$ 0,00</p>

					<img src={income} alt='Entradas'/>
				</div>


			</div>

			<div className='card'>
				<h3>Saídas</h3>

				<div>
					<p id='expenses-display'>R$ 0,00</p>

					<img src={expense} alt='Saídas'/>
				</div>

				
			</div>

			<div className='card total'>
				<h3>Total</h3>

				<div>
					<p id='total-display'>R$ 0,00</p>

					<img src={total} alt='Total'/>
				</div>

				
			</div>
		</section>
	)
}