import { EntityRepository, Repository } from 'typeorm';
import Fertilizer from '../entities/Fertilizer';
// interface CreateFertilizerDTO {
//   description: string;
//   date: Date;
// }

@EntityRepository(Fertilizer)
class FertilizersRepository extends Repository<Fertilizer> {}

export default FertilizersRepository;
