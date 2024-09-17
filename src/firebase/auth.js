import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "./connection";
import { getUserByEmail } from "./users";

export const authenticate = async () => {
  return new Promise((resolve) => {
    const auth = getAuth(firebaseConfig);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const dataUser = await getUserByEmail(user.email);
        resolve(dataUser);
      } else resolve(null);
      unsubscribe();
    });
  });
};