import { FastifyInstance } from 'fastify';
import db from '../database';
import bcrypt from 'bcrypt';

export default async function registerRoute(fastify: FastifyInstance) {
  // Endpoint para registrar usuário
  fastify.post('/register', async (request, reply) => {
    const { name, email, password } = request.body as { name: string; email: string; password: string };

    // Verificar se todos os campos foram preenchidos
    if (!name || !email || !password) {
      return reply.status(400).send({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
      // Função para verificar se o usuário já existe
      const verificarUsuario = (email: string): Promise<any> => {
        return new Promise((resolve, reject) => {
          db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
            if (err) {
              reject('Erro ao verificar usuário.');
            } else {
              resolve(row);
            }
          });
        });
      };

      // Função para inserir o novo usuário
      const inserirUsuario = (name: string, email: string, hashedPassword: string): Promise<any> => {
        return new Promise((resolve, reject) => {
          db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], function (err) {
            if (err) {
              reject('Erro ao registrar usuário.');
            } else {
              resolve(this.lastID);
            }
          });
        });
      };

      // Verificar se o usuário já existe
      const usuarioExistente = await verificarUsuario(email);
      if (usuarioExistente) {
        return reply.status(400).send({ error: 'Usuário já registrado.' });
      }

      // Criptografar a senha com bcrypt
      const hashedPassword = await bcrypt.hash(password, 10); // 10 é o número de salt rounds

      // Inserir o novo usuário com a senha criptografada
      const lastID = await inserirUsuario(name, email, hashedPassword);
      
      // Enviar resposta de sucesso
      return reply.status(201).send({ message: 'Usuário registrado com sucesso!', id: lastID, name, email });

    } catch (err) {
      return reply.status(500).send({ error: err });
    }
  });
}
