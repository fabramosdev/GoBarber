import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const userExist = await usersRepository.findOne({ where: { email } });

    if (userExist) {
      throw Error('This e-mail is already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await usersRepository.save(user);

    return savedUser;
  }
}

export default CreateUserService;