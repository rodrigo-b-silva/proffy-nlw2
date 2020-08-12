import express from 'express';
import db from './database/connection';

const router = express.Router();

router.post('/classes', async (req, res) => {
  const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

  const userIds = await db('users').insert({
    name, avatar, whatsapp, bio
  });

  const user_id = userIds[0];

  await db('classes').insert({
    subject, cost, user_id
  });

  return res.status(200).json({ success: 1 })
})

export default router;