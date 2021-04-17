import { getCustomRepository } from 'typeorm';

import Fertilizer from '../infra/typeorm/entities/Fertilizer';
import FertilizersRepository from '../repositories/FertilizersRepository';

interface Request {
  description: string;
  date: Date;
}

class FertilizerService {
  public async execute({ description, date }: Request): Promise<Fertilizer> {
    const fertilizersRepository = getCustomRepository(FertilizersRepository);
    const fertilizer = fertilizersRepository.create({
      description,
      date,
    });

    await fertilizersRepository.save(fertilizer);

    return fertilizer;
  }
}

export default FertilizerService;
