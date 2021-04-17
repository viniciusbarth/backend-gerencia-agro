import { EntityRepository, Repository } from 'typeorm';
import Fertilizer from '../infra/typeorm/entities/Fertilizer';

@EntityRepository(Fertilizer)
class FertilizersRepository extends Repository<Fertilizer> {}

export default FertilizersRepository;
