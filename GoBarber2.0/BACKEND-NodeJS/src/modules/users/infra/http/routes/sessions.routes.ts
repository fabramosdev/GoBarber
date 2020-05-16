import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionsService from '@modules/users/services/CreateSessionsService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const sessionsService = container.resolve(CreateSessionsService);

  const { user, token } = await sessionsService.execute({ email, password });

  return response.json({ user, token });
});

export default sessionsRouter;
