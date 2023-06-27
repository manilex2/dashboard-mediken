export const environment = {
  production: false,
  msalConfig: {
      auth: {
          tenantId: 'TENANT_ID',
          clientId: 'CLIENT_ID',
          authority: 'DIRECCION_AUTORIDAD',
          server: "DIRECCION_HOST"
      }
  },
  apiConfig: {
      scopes: ['SCOPES'],
      uri: 'URI_ACCESSO',
      postLogoutUrl: 'POSTLOGOUT_URL'
  },
  powerbiConfig: {
    tokenEndPoint: 'URL_TOKEN',
    resource: 'RESOURCE_URL',
    prompt: 'PROMPT',
    reportId: 'ID_REPORTE',
    embedUrl: 'EMBED_URL'
  }
};
