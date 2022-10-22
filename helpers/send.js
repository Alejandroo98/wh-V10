const DELAY_TIME = 300; //ms

/**
 * Enviamos un mensaje simple (texto) a nuestro cliente
 * @param {*} number
 */
const sendMessage = async (
	client,
	number,
	msg,
	{ nombreCliente, apellidoCliente }
) => {
	setTimeout(async () => {
		try {
			console.log(`⚡⚡⚡ Enviando mensaje a ${nombreCliente}....`);
			client.sendMessage(number, msg);
		} catch (error) {
			console.log(
				`😡😡😡 ERROR - MENSAJES NO ENVIADO DE  ${nombreCliente} ${apellidoCliente} 😡😡`
			);
		}
	}, DELAY_TIME);
};

module.exports = { sendMessage };
