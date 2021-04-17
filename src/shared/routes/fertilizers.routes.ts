import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAutheticated';

import FertilizersRepository from '../../modules/fertilizers/repositories/FertilizersRepository';
import CreateFertilizerService from '../../modules/fertilizers/services/CreateFertilizerService';

const fertilizersRouter = Router();

fertilizersRouter.use(ensureAuthenticated);

fertilizersRouter.get('/', async (request, response) => {
  const fertilizersRepository = getCustomRepository(FertilizersRepository);
  const fertilizers = await fertilizersRepository.find();

  return response.json(fertilizers);
});

fertilizersRouter.post('/', async (request, response) => {
    const { description, date } = request.body;

    const parsedFertilizer = parseISO(date);

    const createFertilizer = new CreateFertilizerService();

    const fertilizer = await createFertilizer.execute({
      date: parsedFertilizer,
      description,
    });

    return response.json(fertilizer);
});

export default fertilizersRouter;
