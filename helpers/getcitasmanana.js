const { Client: ClientNotion } = require('@notionhq/client');

//NOTION API//
const notion = new ClientNotion({ auth: 'secret_gPapUdg5Q0b7Xy6UCgiLetfZ7cFZfnSzlSj6dwMEf3Z' });
const databaseId = '21678fa5f3e341609c25ddda20c02ce3';

const formatDate = () => {
  const today = new Date();
  let dia = '';
  let mes = '';

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowDate = tomorrow.toLocaleDateString();
  const dateSplit = tomorrowDate.split('/');

  if (dateSplit[1].length == '1') {
    dia = `0${dateSplit[1]}`;
  } else {
    dia = dateSplit[1];
  }

  if (dateSplit[0].length == '1') {
    mes = `0${dateSplit[0]}`;
  } else {
    mes = dateSplit[0];
  }

  //Como deberia ser -> año/mes/dia -> 2022-03-31
  //Lo que resivo -> año/dia/mes -> 2022-31-3

  //desarrollo
  // const newDate = `${dateSplit[2]}-${mes}-${dateSplit[0]}`;

  //produccion
  //mes[0]/day[1]/año[2]
  // 2022[2]-03[0]-31[1]
  const nuevaHora = `${dateSplit[2]}-${mes}-${dia}`;
  return nuevaHora;
};

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
              equals: formatDate(),
              // equals: '2022-04-28',
            },
          },
        ],
      },
    });

    const propertiesObjet = response.results;

    propertiesObjet.forEach((value) => {
      let telefono = false;
      const recordar = value.properties['¿Recordar cita?'].select.name || 'RECORDAR CITA';
      const nombres = value.properties.nombresWh.rollup.array[0].title[0].plain_text;
      const numDb = value.properties.Telefono.rollup.array[0].phone_number.trim().slice(1) || false;
      if (numDb) {
        telefono = '593' + numDb + '@c.us';
      }

      const getfechaYHora = value.properties['Fecha y hora'].date.start;
      const newFechaYHora = new Date(getfechaYHora);
      // const hora = newFechaYHora.getHours() + ':' + newFechaYHora.getMinutes();

      const hora = formatTime(newFechaYHora.toLocaleTimeString());
      let fechaChange = newFechaYHora.toLocaleDateString().split('/');
      let fecha = `${fechaChange[1]}-${fechaChange[0]}-${fechaChange[2]}`;

      if (recordar == 'RECORDAR CITA') {
        sendMessage = [...sendMessage, { nombres, telefono, fecha, hora }];
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
