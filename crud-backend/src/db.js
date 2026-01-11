import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("./firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // opcional: se quiser usar Realtime DB, mas para Firestore não precisa
  // databaseURL: "https://SEU_PROJECT_ID.firebaseio.com"
});

export const db = admin.firestore();
