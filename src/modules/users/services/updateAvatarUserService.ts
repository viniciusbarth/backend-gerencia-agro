import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateAvatarUserService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Somente é possível alterar avatar estando autenticado!', 401);
    }

    if (user.avatar) {
      // deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateAvatarUserService;
