const { msg_important, name, enlace_wh } = require('./msg');
const { sendMessage } = require('./send');

const msg_send_wh = async (client) => {
	// ! PRODUCCION ****
	const { getCitasManana } = require('./getcitasmanana');
	const citasManana = await getCitasManana();

	// **** DESARROLLO ****
	// const citasManana = require('../DB/contactos.json');

	citasManana.forEach(({ hora, telefono, nombres }) => {
		try {
			const diaCita = 'mañana';
			// const diaCita = 'HOY';
			let nombreCliente = nombres.split(' ')[0];
			let apellidoCliente = nombres.split(' ')[1];
			const saludo = `Srta.  ${nombreCliente}.`;
			const remind_msg = `Le recordamos su cita el día de *${diaCita} a las ${hora.trim()}* para su sesión de depilación.`;
			const msg_remind = `Contamos con su visita y agradecemos su puntualidad. ✅`;

			const msg = `${saludo}\n \n ${remind_msg} \n \n ${msg_remind} \n \n ${name} `;

			if (telefono) {
				sendMessage(client, telefono, msg, { nombreCliente, apellidoCliente });

				// sendMessage(client, telefono, msg_important, {
				// 	nombreCliente,
				// 	apellidoCliente,
				// });

				// sendMessage(client, telefono, enlace_wh, {
				// 	nombreCliente,
				// 	apellidoCliente,
				// });
			}
		} catch (error) {
			console.log('🔴 ERROR - msg_send_wh.js 🔴', error);
		}
	});
};

module.exports = {
	msg_send_wh,
};
