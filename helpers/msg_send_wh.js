const { name } = require('./msg');
const { sendMessage } = require('./send');

const msg_send_wh = async (client) => {
	// ! PRODUCCION ****
	const { getCitasManana } = require('./getcitasmanana');
	const citasManana = await getCitasManana();

	// **** DESARROLLO ****
	// const citasManana = require('../DB/contactos.json');

	citasManana.forEach(({ hora, telefono, nombres, sucursal, fecha }) => {
		try {
			let nombreCliente = nombres.split(' ')[0];
			let apellidoCliente = nombres.split(' ')[1];

			const diaCita = 'HOY';
			const saludo = `Srta.  ${nombreCliente}. 😊`;
			const permitanos = `Permítanos recordarle su cita ⏰`;
			const datos_cita = `• *Fecha:* ${fecha} ( ${diaCita} ) \n • *Hora:* ${hora.trim()} \n • *Sucursal:* ${sucursal}`;
			const cierre = `Contamos con su visita y agradecemos su puntualidad. ✅`;
			const msg_automatico = '*Mensaje automático*';

			const msg = `${saludo}\n \n ${permitanos} \n \n ${datos_cita} \n \n ${cierre} \n \n ${name} \n ${msg_automatico} 🤖`;

			if (telefono) {
				sendMessage(client, telefono, msg, { nombreCliente, apellidoCliente });
			}
		} catch (error) {
			console.log('🔴 ERROR - msg_send_wh.js 🔴', error);
		}
	});
};

module.exports = {
	msg_send_wh,
};
