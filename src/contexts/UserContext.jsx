// src/contexts/UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase'; // Ajuste o caminho conforme necessário

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const storageRef = ref(storage, `imgProfile/${currentUser.uid}/profile.jpg`); // Ajuste o caminho conforme necessário
          const url = await getDownloadURL(storageRef);
          setProfileImage(url);
        } catch (error) {
          console.error("Erro ao obter a imagem de perfil:", error);
        }
      } else {
        setProfileImage(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, profileImage }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
