import ReactDOM from 'react-dom'

import minus from './assets/minus.svg'
import { v4 as uuidv4 } from 'uuid'

export const modalToggle = () => {
	document
		.querySelector('.modal-overlay')
		.classList
		.toggle('active')

	// Clean input fields
	document.getElementById('description').value = ''
	document.getElementById('amount').value = ''
	document.getElementById('date').value = ''
}


const Storage = {
	get() {
		return JSON.parse(localStorage.getItem('dev.finance:transactions')) || []
		
	},

	set() {
		localStorage.setItem('dev.finance:transactions', JSON.stringify(Transaction.all))
	}
}

export const Form = {
	formatedValues() {
		return {
			amount: Format.amount(document.querySelector('input#amount').value),
			date: Format.date(document.querySelector('input#date').value)
		}
	},

	getValues() {
		const { amount, date } = Form.formatedValues()

		return {
			description: document.querySelector('input#description').value,
			amount,
			date
		}
	},

	submit(event) {
		event.preventDefault()

		const {description, amount, date} = Form.getValues()

		try {
			// Validate input fields
			if (document.querySelector('input#description').value === '' ||
				document.querySelector('input#amount').value === '' ||
				document.querySelector('input#date').value === '') {

				throw new Error('Preencha todos os campos')
			} 

			const data = {
				description,
				amount,
				date
			}

			Transaction.add(data)
	
		} catch (error) {
			alert(error)
		}
		
		// Clean input fields
		document.querySelector('input#description').value = ''
		document.querySelector('input#amount').value = ''
		document.querySelector('input#date').value = ''
	
	}
}

export const Transaction = {
	all: Storage.get(),

	add(value) {

		Transaction.all.push(value)
		
		Storage.set()

		modalToggle()
		Transaction.render()

	},

	remove(index) {
		Transaction.all.splice(index, 1)
		
		Storage.set()
		Transaction.render()
	},

	render() {
		
		ReactDOM.render(

			Transaction.all.map((value, index) => {

				const amount = Format.currency(value.amount)

				const amountClass = value.amount > 0 ? 'income' : 'expense'

				return (

					<tr key={uuidv4()}>
						<td className="description">{value.description}</td>
						<td className={amountClass}>{amount}</td>
						<td>{value.date}</td>
										 
						<td>
							<img src={minus} 
							alt='Remover Transação' 
							style={{cursor: 'pointer'}} 
							onClick={() => Transaction.remove(index)} />
						</td>

					</tr>
				)

			}),
			document.getElementById('transactions-container')
		)

		updateBalance()

	}

}


const Format = {
	amount(value) {
		value = value * 100

		return Math.round(value)
	},

	date(value) {
		const dateArray = value.split('-')

		return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
	},

	currency(value) {
		// Put '-' signal if value is negative
		const signal = Number(value) < 0 ? '-' : ''

		// Remove all values that are not numbers
		value = String(value).replace(/\D/g, '')

		value = Number(value) / 100

		// Format to BRL currency
		value = value.toLocaleString('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		})

		return signal + value
	}
} 


const Balance = {
	incomes() {
		let income = 0

		Transaction.all.forEach(transaction => {
			if (transaction.amount > 0) {
				income += transaction.amount
			}
		})

		return income
	},

	expenses() {
		let expense = 0

		Transaction.all.forEach(transaction => {
			if (transaction.amount < 0) {
				expense += transaction.amount
			}
		})

		return expense

	},

	total() {
		return Balance.incomes() + Balance.expenses()
	}
}

function updateBalance() {
	document
		.getElementById('incomes-display')
		.innerHTML = Format.currency(Balance.incomes())
	document
		.getElementById('expenses-display')
		.innerHTML = Format.currency(Balance.expenses())
	document
		.getElementById('total-display')
		.innerHTML = Format.currency(Balance.total())
}

const App = {
	init() {
		window.onload = () => {

			Transaction.render()
			updateBalance()
		}

	}
}

App.init()


