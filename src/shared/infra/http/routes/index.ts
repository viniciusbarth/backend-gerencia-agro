import { Router } from 'express';
import fertilizersRouter from '@modules/fertilizers/infra/http/routes/fertilizers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/fertilizers', fertilizersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
