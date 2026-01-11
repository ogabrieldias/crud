import express from 'express';
import cors from 'cors'
import clientRoutes from "./routes/clientRoutes.js"

const app = express();
const port = 3000;

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/api', clientRoutes);

app.listen(port, () => {
    console.log("listening on port 3000")
});
