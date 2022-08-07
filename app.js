require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const { createClient } = require('./helpers/handle');
const { connectionReady, connectionLost } = require('./helpers/connection');
const { sendMessage } = require('./helpers/send');
const { reply_msg, enlace_wh, msg_important } = require('./helpers/msg');
const handleTime = require('./helpers/handleTime');
const { getCitasManana } = require('./helpers/getcitasmanana');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
const MULTI_DEVICE = process.env.MULTI_DEVICE || 'true';
const server = require('http').Server(app);

const port = process.env.PORT || 3000;
const SESSION_FILE_PATH = './session.json';
var client;
var sessionData;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.use('/', require('./routes/web'));

const listenMessage = () => {
	return client.on('message', async (msg) => {
		const { from, body } = msg;
		console.log('De:', from, '- Msg:', body);

		sendMessage(client, from, msg_important);
		sendMessage(client, from, enlace_wh);
	});
};

const withSession = () => {
	console.log(`Validando session con Whatsapp...`);
	sessionData = require(SESSION_FILE_PATH);
	client = new Client(createClient(sessionData, true));

	client.on('ready', () => {
		connectionReady();
		listenMessage();
	});

	client.on('auth_failure', () => connectionLost());

	client.initialize();
};

const withOutSession = () => {
	console.log('No tenemos session guardada');
	console.log(
		[
			'🙌 El core de whatsapp se esta actualizando',
			'🙌 para proximamente dar paso al multi-device',
			'🙌 Si estas usando el modo multi-device se generan 2 QR Code escanealos',
			'🙌 Ten paciencia se esta generando el QR CODE',
			'________________________',
		].join('\n')
	);

	client = new Client(createClient());

	client.on('qr', (qr) => {
		qrcode.generate(qr, { small: true });
		socketEvents.sendQR(qr);
	});

	client.on('ready', (a) => {
		connectionReady();
		listenMessage();
		// socketEvents.sendStatus(client)
	});

	client.on('auth_failure', (e) => {
		// console.log(e)
		// connectionLost()
	});

	client.initialize();
};

fs.existsSync(SESSION_FILE_PATH) && MULTI_DEVICE === 'false'
	? withSession()
	: withOutSession();

setInterval(function () {
	handleTime(client);
}, 1000);

getCitasManana().then((x) => {
	console.log(x);
	console.log('==== Numero ====', x.length);
});

server.listen(port, () => {
	console.log(`El server esta listo por el puerto ${port}`);
});
