export const environment = {
  production: false,
  msalConfig: {
      auth: {
          tenantId: 'd687bebf-fc49-4200-8f09-8c4be364781e',
          clientId: '134f965f-af8f-42d7-918a-245cdea69e37',
          authority: 'https://login.microsoftonline.com/d687bebf-fc49-4200-8f09-8c4be364781e',
          server: 'http://localhost:4200',
          groupId: "fe7aba69-2d44-4897-8e64-625d644e0365"
      }
  },
  apiConfig: {
      scopes: ['user.read'],
      uri: 'https://graph.microsoft.com/v1.0/me',
      postLogoutUrl: 'http://localhost:4200',
      serverTokenUrl: 'http://localhost:5300/getEmbedToken'
  },
  powerbiConfig: {
    tokenEndPoint: 'https://login.microsoftonline.com/d687bebf-fc49-4200-8f09-8c4be364781e/oauth2/token',
    resource: 'https://analysis.windows.net/powerbi/api',
    prompt: 'login',
    reportId: '889fa0d9-0930-4544-9d29-538e48862747',
    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=889fa0d9-0930-4544-9d29-538e48862747&autoAuth=true&ctid=f8e85bd0-b790-49b2-a208-9acb0ef5038b',
    pbiUsername: 'dan@invrtir.com',
    pbiPasswod: 'N@thy1511'
  }
};
