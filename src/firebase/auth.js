// src/firebase/auth.js
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const auth = getAuth();

export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName });
    return user;
  } catch (error) {
    console.error("Erro ao registrar o usuário:", error);
    throw error;
  }
};
