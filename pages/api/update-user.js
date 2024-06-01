import updateUserData from './users.module';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, bio, school, contact } = req.body;

  try {
    updateUserData({ name, email, bio, school, contact });
    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update user' });
  }
}