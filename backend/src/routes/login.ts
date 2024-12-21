import { FastifyInstance } from 'fastify';
import db from '../database';
import bcrypt from 'bcrypt';

import { RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression } from 'fastify';

export default async function loginRoute(fastify: FastifyInstance<RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression>) {
  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };

    // Verifica se os campos foram preenchidos
    if (!email || !password) {
      return reply.status(400).send({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
      // Busca o usuário no banco de dados
      const usuario = await new Promise<{ id: number; name: string; email: string; password: string } | null>((resolve, reject) => {
        db.get(
          'SELECT id, name, email, password FROM users WHERE email = ?',
          [email],
          (err, row) => {
            if (err) {
              reject('Erro ao buscar usuário.');
            } else {
              resolve(row as { id: number; name: string; email: string; password: string } | null);
            }
          }
        );
      });

      // Se o usuário não for encontrado
      if (!usuario) {
        return reply.status(404).send({ error: 'Usuário ou senha inválidos.' });
      }

      // Verifica a senha usando bcrypt.compare
      const senhaValida = await bcrypt.compare(password, usuario.password);
      if (!senhaValida) {
        return reply.status(401).send({ error: 'Usuário ou senha inválidos.' });
      }

      // Retorna os dados do usuário (sem a senha)
      const { id, name, email: userEmail } = usuario;
      return reply.status(200).send({ message: 'Login realizado com sucesso!', user: { id, name, email: userEmail } });

    } catch (err) {
      return reply.status(500).send({ error: err });
    }
  });
}
