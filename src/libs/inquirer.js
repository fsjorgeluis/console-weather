require('colors');
const inquirer = require('inquirer');

const questions = [
	{
		type: 'list',
		name: 'option',
		message: 'Make your choice!',
		choices: [
			{ value: 1, name: `${'1.'.green} Search for a city` },
			{ value: 2, name: `${'2.'.green} Search history` },
			{ value: 0, name: `${'0.'.green} Exit` },
		],
	},
];

const inquirerMenu = async () => {
	console.clear();

	console.log('============================='.green);
	console.log('        Weather Info!'.green);
	console.log('=============================\n'.green);

	const { option } = await inquirer.prompt(questions);
	return option;
};

const pauseMenu = async () => {
	console.log('\n');
	return await inquirer.prompt([
		{
			type: 'input',
			name: 'pause',
			message: `Press ${'ENTER'.green} to continue`,
		},
	]);
};

const readInput = async (message) => {
	const { description } = await inquirer.prompt([
		{
			type: 'input',
			name: 'description',
			message,
			validate(value) {
				if (value.length === 0) throw 'You must describe an activity';
				return true;
			},
		},
	]);

	return description;
};

const checkPlaces = async (places = []) => {
	const choices = places.map((place, index) => {
		const placeId = `${index + 1}.`.green;

		return {
			value: place.id,
			name: `${placeId} ${place.place}`,
		};
	});

	// unshift or push thats the question XD
	choices.push({ value: 0, name: `${'0.'.green} Back` });

	const questions = [
		{
			type: 'list',
			name: 'id',
			message: 'Select place',
			choices,
		},
	];

	const { id } = await inquirer.prompt(questions);
	return id;
};

const confirmInput = async (message) => {
	const questions = [
		{
			type: 'confirm',
			name: 'ok',
			message,
		},
	];

	const { ok } = await inquirer.prompt(questions);

	return ok;
};


const placeCheckList = async (places = []) => {
	const choices = places.map((place, index) => {
		const placeId = `${index + 1}.`.green;

		return {
			value: place.id,
			name: `${placeId} ${place.description}`,
			checked: (place.completedAt) ? true : false
		}
	});

	const questions = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Selecciones',
			choices
		}
	];

	const { ids } = await inquirer.prompt(questions);
	return ids;
};

module.exports = {
	inquirerMenu,
	pauseMenu,
	readInput,
	checkPlaces,
	confirmInput,
	placeCheckList,
};
