import Fastify from 'fastify';
import registerRoute from './src/routes/register';
import loginRoute from './src/routes/login'; // Importar a rota de login
import fastifyCors from '@fastify/cors';

const fastify = Fastify({ logger: true });

// Habilitar CORS
fastify.register(fastifyCors, {
  origin: '*', // Ajuste para permitir apenas o domínio do frontend em produção
});

// Log das requisições e respostas
fastify.addHook('onRequest', async (request: { method: any; url: any; }) => {
  fastify.log.info(`Requisição recebida: ${request.method} ${request.url}`);
});

fastify.addHook('onResponse', async (_request: any, reply: { statusCode: any; }) => {
  fastify.log.info(`Resposta enviada: ${reply.statusCode}`);
});

// Registra a rota de registro
fastify.register(registerRoute);

// Registra a rota de login
fastify.register(loginRoute);

// Inicia o servidor na porta 3000
fastify.listen({ port: 3000 }, (err: any, address: any) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`Servidor rodando em ${address}`);
  fastify.log.info('( 🟢 ) Servidor inicializado com sucesso!');
});
