const { msg_important, name, enlace_wh } = require('./msg');
const { sendMessage } = require('./send');

const msg_send_wh = async (client) => {
  // ! PRODUCCION ****
  const { getCitasManana } = require('./getcitasmanana');
  const citasManana = await getCitasManana();

  // **** DESARROLLO ****
  // const citasManana = require('../DB/contactos.json');

  try {
    citasManana.forEach(({ hora, telefono, nombres }) => {
      const diaCita = 'mañana';
      // const diaCita = "hoy"

      const saludo = `Señorita  ${nombres.split(' ')[0]}, nos da gusto saludarle ✨`;
      const remind_msg = `Le recordamos su cita el día de *${diaCita} a las ${hora.trim()}* para su sesión de depilación.`;
      const msg_remind = `Contamos con su visita y agradecemos su puntualidad. ✅`;

      const msg = `${saludo}\n \n ${remind_msg} \n \n ${msg_remind} \n \n ${msg_important} \n \n ${name} `;

      if (telefono) {
        sendMessage(client, telefono, msg);
        sendMessage(client, telefono, enlace_wh);
      }
    });
  } catch (error) {
    console.log('HERRORRRR', error);
  }
};

module.exports = {
  msg_send_wh,
};
