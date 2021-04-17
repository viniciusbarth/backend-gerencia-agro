import { EntityRepository, Repository } from 'typeorm';
import Fertilizer from '../entities/Fertilizer';

@EntityRepository(Fertilizer)
class FertilizersRepository extends Repository<Fertilizer> {}

export default FertilizersRepository;
