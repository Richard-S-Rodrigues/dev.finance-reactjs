import React from 'react'

import './style.css'

import { modalToggle, Form } from '../../Utils'

export default function Modal() {

	
	return (
		<div className='modal-overlay'>
			<div className='modal'>
				<div id='form'>
					<h2>Nova Transação</h2>
					
					<form method='POST' onSubmit={(event) => event.preventDefault()}>

						<div className='input-group'>
							<label htmlFor='' 
							className='screenreader-only'>Descrição</label>
							<input 
								type='text'
								id='description'
								name='description'
								placeholder='Descrição'
								
							/>
						</div>

						<div className='input-group'>
							<small className="help">Use o sinal - (negativo) para despesas e , (vírgula) para casas decimais</small>

							<label htmlFor='amount' 
							className='screenreader-only'>Valor</label>
							<input 
								type='number'
								step='0.01'
								id='amount'
								name='amount'
								placeholder='R$ 0,00'

							/>
						</div>

						<div className='input-group'>
							<label htmlFor='date' 
							className='screenreader-only'>Data</label>
							<input 
								type='date'
								id='date'
								name='date'

							/>
						</div>

						<div className='input-group actions'>
							<button 
								className='btn cancel'
								onClick={modalToggle}
							>Cancelar</button>

							<button onClick={(event) => Form.submit(event)}>Salvar</button>
						</div>

					</form>
				</div>
			</div>
		</div>
	)
}