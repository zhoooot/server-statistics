import 'dotenv/config';

export default {
  redisURL: process.env.REDIS_URL,
  rabbitMQURL: process.env.RABBITMQ_URL,
};
