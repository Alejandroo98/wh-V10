const { msg_send_wh } = require('./msg_send_wh');

const handleTime = (client) => {
  const date = new Date();
  const time = date.toLocaleTimeString();
  console.log(`****====================== ${time} ======================****`);

  //desarrollo
  const timeSendMsg = '19:30:00';

  //produccion
  // const timeSendMsg = '7:00:00 PM';

  if (time == timeSendMsg) {
    console.log('ENVIANDO MENSAJES... ⚡⚡⚡');
    msg_send_wh(client);
  }
};

module.exports = handleTime;
