import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAutheticated';
import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateAvatarUserService from '@modules/users/services/updateAvatarUserService';

const usersRouter = Router();

const upload = multer(uploadConfig);

interface User {
  name: string;
  email: string;
  password?: string;
}

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user: User = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateAvatarUserService = new UpdateAvatarUserService();
      const user = await updateAvatarUserService.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });
      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);

export default usersRouter;
