import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const users = [
  {
    email: 'test@example.com',
    // Pre-hashed password for "test123"
    password: '$2a$10$0vw8qDax7EJK6LQj9KUmN.Z3N3GEAFQ1phABZ6tLU78dcMykycneS',
    balance: 1000
  }
];

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { username, password } = req.body;
  const user = users.find(u => u.email === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email }, 'SECRET_KEY', { expiresIn: '1h' });

  return res.status(200).json({ token, user: { email: user.email } });
}
