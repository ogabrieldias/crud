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

// rotas da API
app.use('/api', clientRoutes);

// 🚨 Não usar app.listen na Vercel
// Em vez disso, exporte o app
export default app;
