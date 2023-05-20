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

			const diaCita = 'MAÑANA';
			// const diaCita = 'HOY';
			const saludo = `Hola, ${nombreCliente}. 👋`;
			const permitanos = `Permíteme recordarte tú cita ⏰`;

			const puntualidad =
				'Por favor, tenga en cuenta que la puntualidad es fundamental para garantizar un servicio de calidad y respetar el tiempo de nuestros demás clientes. Si llega tarde a su cita, es posible que tenga que esperar o reprogramarse para otro momento.  Gracias por su comprensión, nos vemos pronto 😊';

			const datos_cita = `• *Fecha:* ${fecha} ( ${diaCita} ) \n • *Hora:* ${hora.trim()} \n • *Sede:* ${sucursal}`;
			const cierre = `Contamos con tu visita y agradecemos tu puntualidad. ✅`;
			const msg_automatico = '*Mensaje automático*';

			const msg = `${saludo}\n \n ${permitanos} \n \n ${datos_cita} \n \n ${puntualidad} \n \n ${name} \n ${msg_automatico} 🤖`;

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
