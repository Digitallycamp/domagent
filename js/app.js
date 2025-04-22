const form = document.querySelector('form');
const ouput = document.querySelector('output p');
console.log(ouput);
const OPENAI_API_KEY = '';

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
	event.preventDefault();
	const income = event.currentTarget.income.value;
	const expense = event.currentTarget.expense.value;
	const currency = event.currentTarget.currency.value;
	console.log(income, expense, currency);
	if (!income && !expense) {
		return alert('Fileds can not be empty');
	}
	if (!income) {
		return alert('income  can not be empty');
	}
	if (!expense) {
		return alert('expense  can not be empty');
	}

	connectTpOpenAI(income, expense, currency);
}

async function connectTpOpenAI(income, expense, currency) {
	ouput.textContent = 'Retriving advice...';
	const res = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			model: 'gpt-4o',
			messages: [
				{
					role: 'user',
					content: `Given my income:
               ${income} in ${currency} and my expense: ${expense}in  ${currency} give me financial advice . Calculate the sum of expenses, advice if expense is wise. Present your response in  <div></div> with headings 3 (h3) for Income, expenses, Financial Advice and list the advice , group all response in a div element remove <html></html> tag or 'html' and backticks in the formatting. Dont include summary in your response.`,
				},
			],
		}),
	});

	if (res.ok) {
		const data = await res.json();
		const openaiOutput = data.choices[0].message.content;
		console.log(openaiOutput);
		ouput.innerHTML = openaiOutput;
	}
}
