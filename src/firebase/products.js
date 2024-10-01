import { collection, getDocs, getFirestore } from 'firebase/firestore';
import firebaseConfig from './connection';

export const fetchProducts = async () => {
  const db = getFirestore(firebaseConfig);
  const productsCollectionRef = collection(db, 'products');
  const snapshot = await getDocs(productsCollectionRef);
  
  const products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return products;
};
