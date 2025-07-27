import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Token ')) return res.status(401).json({ message: 'No token' });

  const token = authHeader.split(' ')[1];
  let user;

  try {
    user = jwt.verify(token, 'SECRET_KEY');
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const { username, amount, computer_name } = req.body;

  if (user.email !== username) {
    return res.status(403).json({ message: 'Unauthorized user' });
  }

  const newBalance = 1000 + parseFloat(amount); // Simulated balance
  res.status(200).json({ message: 'Wallet updated successfully', balance: newBalance });
}