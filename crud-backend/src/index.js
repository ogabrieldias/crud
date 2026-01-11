import express from 'express';
import cors from 'cors';
import clientRoutes from "./routes/clientRoutes.js";

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use('/api', clientRoutes);

// Só roda o servidor se não estiver em ambiente serverless
if (process.env.NODE_ENV !== "vercel") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

export default app;
