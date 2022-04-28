const { LegacySessionAuth } = require('whatsapp-web.js');

const MULTI_DEVICE = process.env.MULTI_DEVICE || 'true';

const cleanNumber = (number) => {
  number = number.replace('@c.us', '');
  number = `${number}@c.us`;
  return number;
};

/**
 *
 * @param {*} session
 * @param {*} cb
 */
const createClient = (session = {}, login = false) => {
  console.log(`Mode: ${MULTI_DEVICE === 'false' ? 'No Multi-device' : 'Si Multi-device'} `);

  const objectLegacy = login
    ? {
        authStrategy: new LegacySessionAuth({
          session,
        }),
      }
    : { session };

  if (MULTI_DEVICE == 'false') {
    return {
      ...objectLegacy,
      restartOnAuthFail: true,
      puppeteer: {
        args: ['--no-sandbox'],
      },
    };
  } else {
    return {
      puppeteer: {
        headless: true,
        args: ['--no-sandbox'],
      },
      clientId: 'client-one',
    };
  }
};

module.exports = { cleanNumber, createClient };
