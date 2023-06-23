import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import exampleData from '@/app/exampleData.json'
import { jwt } from '../../../../utils';

type Data =
  | { message: string }
  | {
    token: string;
    user: {
      email: string;
      name: string;
      job: string;
      company: string;
      address: string;
      school: string;
      about: string;
      avatar: string;
      banner: string;
    }
  }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return loginUser(req, res)

    default:
      res.status(400).json({
        message: 'Bad request'
      })
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { email = '', password = '' } = req.body;
    const user = exampleData.find(({ email: userEmail }) => (userEmail === email));
    if (!user) {
      return res.status(400).json({ message: 'Correo o contraseña no válidos - EMAIL' })
    }
    if (!bcrypt.compareSync(password, user.password!)) {
      return res.status(400).json({ message: 'Correo o contraseña no válidos - Password' })
    }
    const { name, id, about, address, company, job, school, avatar, banner } = user;
    const token = jwt.signToken(id, email);
    return res.status(200).json({
      token,
      user: {
        email, name, about, address, company, job, school, avatar, banner
      }
    })
  } catch (error: unknown) {
    return res.status(500).json({ message: 'Error al iniciar sesión' })
  }
}