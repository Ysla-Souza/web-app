import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBSzwd9nYoqYhi4cLDLUSrMGH1wM8P2kis",
  authDomain: "crisblack-5e865.firebaseapp.com",
  projectId: "crisblack-5e865",
  storageBucket: "crisblack-5e865.appspot.com",
  messagingSenderId: "305206969732",
  appId: "1:305206969732:web:b87de81c82a1f3c0c149d1",
  measurementId: "G-WY49PJM68R"
};

// // Inicializa o Firebase
const app = initializeApp(firebaseConfig);
// // export const auth = getAuth(app);
// // export const storage = getStorage(app);
const db = getFirestore(app);

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
// // Função para login com Google
// const provider = new GoogleAuthProvider();
// export const entrarComGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;

//     // Redirecionar para a página de perfil do usuário
//     window.location.href = `/profile`;
//   } catch (error) {
//     console.error('Erro ao fazer login com Google', error);
//     throw error; // Re-lançar o erro para que ele possa ser tratado no componente
//   }
// };

// // Função para buscar produtos do Firestore
// export const fetchProducts = async () => {
//   const productsCollection = collection(db, 'products');
//   const productsSnapshot = await getDocs(productsCollection);
//   const productsList = productsSnapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   return productsList;
// };