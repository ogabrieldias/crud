import express from 'express';
import cors from 'cors';
import clientRoutes from "./routes/clientRoutes.js";

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://crud-frontend-dpes.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json());
app.use('/api', clientRoutes);

// ✅ Localmente abre a porta, na Vercel só exporta
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

export default app;
