export const environment = {
  production: false,
  msalConfig: {
      auth: {
          tenantId: 'd687bebf-fc49-4200-8f09-8c4be364781e',
          clientId: '134f965f-af8f-42d7-918a-245cdea69e37',
          authority: 'https://login.microsoftonline.com/d687bebf-fc49-4200-8f09-8c4be364781e',
          server: "https://medikenprueba.azurewebsites.net",
          groupId: "cc47da80-21e1-487d-a4c3-4197c472abcb"
      }
  },
  apiConfig: {
      scopes: ['user.read'],
      uri: 'https://graph.microsoft.com/v1.0/me',
      postLogoutUrl: 'https://medikenprueba.azurewebsites.net',
      serverTokenUrl: 'https://medikenprueba.azurewebsites.net/getEmbedToken'
  },
  powerbiConfig: {
    tokenEndPoint: 'https://login.microsoftonline.com/d687bebf-fc49-4200-8f09-8c4be364781e/oauth2/token',
    resource: 'https://analysis.windows.net/powerbi/api',
    prompt: 'login',
    reportId: '70d91214-d039-492f-8de1-246790e509b2',
    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=70d91214-d039-492f-8de1-246790e509b2&autoAuth=true&ctid=c361d585-d96f-45aa-9cc6-2d7b2db780ea',
    pbiUsername: 'desarrollo@mediken.com.ec',
    pbiPasswod: 'Hud96385'
  }
};
