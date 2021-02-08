import React from 'react'

import './style.css'

import { modalToggle } from '../../Utils'


export default function TransactionSection() {

	return (
		<section id='transaction'>
			<h2 className='screenreader-only'>Transações</h2>

			<button className='btn new' onClick={modalToggle}>+ Nova Transação</button>

			<table id='data-table'>
				<thead>
					<tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Data</th>

                        <th></th>
                    </tr>
				</thead>
				<tbody id='transactions-container'>

				</tbody>
			</table>
		</section>
	)
}