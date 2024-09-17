import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { createProfileImage } from "./storage";
import firebaseConfig from "./connection";

export const registerUser = async (name, email, password, profilePhoto) => {
  try {
    const auth = getAuth(firebaseConfig);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    let imageProfile = null;
    if (profilePhoto) imageProfile = await createProfileImage(user.uid, profilePhoto);
    const db = getFirestore(firebaseConfig);
    await setDoc(doc(db, 'users', user.uid), { email, name, shoppingCart: [], imageProfile });
  } catch(error) {
    window.alert('Ocorreu um erro ao registrar o usuário: ' + error);
  }
};

export async function getUserByEmail(email) {
    try {
      const db = getFirestore(firebaseConfig);
      const usersCollectionRef = collection(db, 'users');
      const q = query(usersCollectionRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) window.alert('Usuário com o email fornecido não encontrado.');
      else {
        let user;
        querySnapshot.forEach((doc) => {
          user = doc.data();
          user.id = doc.id;
        });
        return user;
      }
    } catch (error) {
      window.alert('Erro ao obter usuário por email: ' + error);
      return false;
    }
  }