const DELAY_TIME = 170; //ms

/**
 * Enviamos un mensaje simple (texto) a nuestro cliente
 * @param {*} number
 */
const sendMessage = async (client, number, msg) => {
  setTimeout(async () => {
    console.log(`⚡⚡⚡ Enviando mensajes....`);
    client.sendMessage(number, msg);
  }, DELAY_TIME);
};

module.exports = { sendMessage };
