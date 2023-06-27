export const environment = {
  production: false,
  msalConfig: {
      auth: {
          tenantId: 'd687bebf-fc49-4200-8f09-8c4be364781e',
          clientId: '134f965f-af8f-42d7-918a-245cdea69e37',
          authority: 'https://login.microsoftonline.com/d687bebf-fc49-4200-8f09-8c4be364781e',
          server: "https://medikenprueba.azurewebsites.net"
      }
  },
  apiConfig: {
      scopes: ['user.read'],
      uri: 'https://graph.microsoft.com/v1.0/me',
      postLogoutUrl: 'https://medikenprueba.azurewebsites.net'
  },
  powerbiConfig: {
    tokenEndPoint: 'https://login.microsoftonline.com/d687bebf-fc49-4200-8f09-8c4be364781e/oauth2/token',
    resource: 'https://analysis.windows.net/powerbi/api',
    prompt: 'login',
    reportId: '1238c4b2-c738-442c-909a-0589011425e6',
    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=1238c4b2-c738-442c-909a-0589011425e6&autoAuth=true&ctid=f8e85bd0-b790-49b2-a208-9acb0ef5038b'
  }
};
