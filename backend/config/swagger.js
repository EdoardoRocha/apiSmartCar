const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API Express',
      version: '1.0.0',
      description: 'Documentação da minha API de exemplo',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  // ISTO É O MAIS IMPORTANTE:
  // Como o seu projeto usa Consign, o caminho deve apontar para a pasta config
  apis: ['./config/routes.js'], 
};

module.exports = swaggerOptions;