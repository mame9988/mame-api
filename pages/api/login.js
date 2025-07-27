import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const users = [
  { email: 'test@example.com', password: bcrypt.hashSync('test123', 10), balance: 1000 }
];

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });

  const { username, password } = req.body;
  const user = users.find(u => u.email === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email }, 'SECRET_KEY', { expiresIn: '1h' });

  res.status(200).json({ token, user: { email: user.email } });
}