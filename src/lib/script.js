const script = {
	greetings: {
		human: ['hello', 'hi', 'bonjour'],
		response: "Please could you tell me what industry are you interested in? [Investment, Finance, Transport or Retail]"
	},
	industry: [
		{
		name: 'investment',
		response: 'Ok, lets talk about Investments!'
		},
		{
		name: 'finance',
		response: 'Ok, lets talk about Finance!'
		},
		{
		name: 'retail',
		response: 'Ok, lets talk about Retail!'
		},
		{
		name: 'transport',
		response: 'Ok, lets talk about Transport!'
		},
	],
	noResponse: 'Sorry I only have a set number of responses that I can answer. Start off by sayin "Hi" or would you like to speak to a human agent?',
	contactHuman: 'yes',
	dontContactHuman: 'no',
	humanAgent: 'Sure you can contact Imran via his email of ...@hotmail.com. Say "Hi" to restart conversation.'

}

export default script;