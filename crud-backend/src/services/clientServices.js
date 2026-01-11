import { db } from "../db.js";

export const getClients = async () => {
  const snapshot = await db.collection("clients").get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createClient = async (clientData) => {
  const ref = await db.collection("clients").add(clientData);
  const doc = await ref.get();
  return { id: ref.id, ...doc.data() };
};

export const updateClient = async (clientId, clientData) => {
  const docRef = db.collection("clients").doc(clientId);
  const doc = await docRef.get();
  if (!doc.exists) return null;

  await docRef.update(clientData);
  const updated = await docRef.get();
  return { id: updated.id, ...updated.data() };
};

export const deleteClient = async (clientId) => {
  const docRef = db.collection("clients").doc(clientId);
  const doc = await docRef.get();
  if (!doc.exists) return false;

  await docRef.delete();
  return true;
};

export const searchClients = async (searchTerm) => {
  // Firestore não tem ILIKE, mas podemos usar "where" com igualdade ou prefixo.
  // Para busca simples, podemos filtrar em memória:
  const snapshot = await db.collection("clients").get();
  const allClients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const term = searchTerm.toLowerCase();
  return allClients.filter(c =>
    c.name?.toLowerCase().includes(term) ||
    c.email?.toLowerCase().includes(term) ||
    c.job?.toLowerCase().includes(term)
  );
};
