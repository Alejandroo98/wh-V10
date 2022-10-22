const { clearConfigCache } = require('prettier');

const formatDate = () => {
	const today = new Date();
	let dia = '';
	let mes = '';

	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const tomorrowDate = tomorrow.toLocaleDateString();
	// [ "dia", "mes", "año" ] -> orden del datesplit en desarrollo
	const dateSplit = tomorrowDate.split('/');
	const anio = dateSplit[2];
	console.log(dateSplit, 'dateSplittttttttttttt');

	if (dateSplit[1].length == '1') {
		mes = `0${dateSplit[1]}`;
	} else {
		mes = dateSplit[1];
	}

	if (dateSplit[0].length == '1') {
		dia = `0${dateSplit[0]}`;
	} else {
		dia = dateSplit[0];
	}

	//Como deberia ser -> año/mes/dia -> 2022-03-31
	//Lo que resivo -> año/dia/mes -> 2022-31-3

	//desarrollo
	const nuevaHora = `${anio}-${mes}-${dia}`;

	//produccion
	//mes[0]/day[1]/año[2]
	// 2022[2]-03[0]-31[1]
	// const nuevaHora = `${dateSplit[2]}-${mes}-${dia}`;
	return nuevaHora;
	// return '2022-09-03';
};

module.exports = formatDate;
