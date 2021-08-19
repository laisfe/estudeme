import data from '../../auth_config.json';

export const environment = {
  production: false,
  SERVER_URL: 'https://estudeme.azurewebsites.net',
  auth: {
    domain: data.domain,
    clientId: data.clientId,
    redirectUri: `${window.location.origin}`
  }
};
