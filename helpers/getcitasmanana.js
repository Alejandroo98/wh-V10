const { Client: ClientNotion } = require('@notionhq/client');
const { fechaEnvio } = require('../BASE/data');

//NOTION API//
const notion = new ClientNotion({
	auth: 'secret_gPapUdg5Q0b7Xy6UCgiLetfZ7cFZfnSzlSj6dwMEf3Z',
});
const databaseId = '21678fa5f3e341609c25ddda20c02ce3';

const formatTime = (time) => {
	const hora = time.split(':');

	return `${hora[0]}:${hora[1]} `;
};

const getCitasManana = async () => {
	let sendMessage = [];

	try {
		const response = await notion.databases.query({
			database_id: databaseId,
			filter: {
				and: [
					{
						property: 'Fecha y hora',
						date: {
							// equals: fechaEnvio,
							equals: '2022-10-22',
						},
					},
				],
			},
		});

		const propertiesObjet = response.results;

		propertiesObjet.forEach((value) => {
			let telefono = '';
			const recordar =
				value.properties['¿Recordar cita?'].select.name || 'RECORDAR CITA';
			const nombres =
				value.properties.nombresWh.rollup.array[0].title[0].plain_text;

			const sucursal =
				value.properties.sucursalWh.rollup.array[0].title[0].plain_text;

			let numDb =
				value.properties.Telefono.rollup.array[0].phone_number || false;
			if (numDb) {
				telefono = '593' + numDb.trim().slice(1) + '@c.us';
			}

			const getfechaYHora = value.properties['Fecha y hora'].date.start;
			const newFechaYHora = new Date(getfechaYHora);
			// const hora = newFechaYHora.getHours() + ':' + newFechaYHora.getMinutes();

			const hora = formatTime(newFechaYHora.toLocaleTimeString());
			let fechaChange = newFechaYHora.toLocaleDateString().split('/');
			let fecha = `${fechaChange[0]}/${fechaChange[1]}/${fechaChange[2]}`;

			if (recordar == 'RECORDAR CITA' && numDb) {
				sendMessage = [
					...sendMessage,
					{ nombres, telefono, fecha, hora, sucursal },
				];
			}
		});
	} catch (error) {
		console.error(error);
	}
	return sendMessage;
};

module.exports = {
	getCitasManana,
};
