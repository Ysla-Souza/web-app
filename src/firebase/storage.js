import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getApp } from 'firebase/app'; 
import firebaseConfig from "./connection";

// const storage = getStorage(getApp());

export const uploadProfilePhoto = async (file, userId) => {
  if (!file) return null;
  
  try {
    const storage = getStorage(firebaseConfig);
    const fileRef = ref(storage, `imgProfile/${userId}/${file.name}`);
    await uploadBytes(fileRef, file); 
    const downloadURL = await getDownloadURL(fileRef); 
    return downloadURL;
  } catch (error) {
    console.error("Erro ao fazer upload da foto de perfil:", error);
    throw error;
  }
};


export async function createProfileImage(id, img){
  try {
    const storage = getStorage(firebaseConfig);
    const storageRef = ref(storage, `images/users/${id}/${img.name}`);
    await uploadBytes(storageRef, img);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    window.alert("Erro ao fazer upload da midia imagem: " + error.message);
    return false;
  }
};