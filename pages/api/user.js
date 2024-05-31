import userData from './user.json';

export default (req, res) => {
  res.status(200).json({ user: userData });
};