export const environment = {
  production: false,
  serverURL: "URL DEL SERVIDOR EXPRESS",
  msalConfig: {
      auth: {
          tenantId: 'TENANT_ID',
          clientId: 'CLIENT_ID',
          authority: 'DIRECCION_AUTORIDAD',
          server: "DIRECCION_HOST",
          groupId: "ID_AREA_TRABAJO"
      }
  },
  apiConfig: {
      scopes: ['SCOPES'],
      uri: 'URI_ACCESSO',
      postLogoutUrl: 'POSTLOGOUT_URL',
      serverTokenUrl: 'URL_SERVER_TOKEN'
  },
  powerbiConfig: {
    tokenEndPoint: 'URL_TOKEN',
    resource: 'RESOURCE_URL',
    prompt: 'PROMPT',
    reportId: 'ID_REPORTE',
    embedUrl: 'EMBED_URL',
    pbiUsername: 'USUARIO_POWERBI',
    pbiPasswod: 'CONTRASEÑA_POWERBI'
  }
};
