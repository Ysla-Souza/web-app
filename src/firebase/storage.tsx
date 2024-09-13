import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getApp } from 'firebase/app'; // Importa o app Firebase já inicializado

// Obtém a instância do Storage do app Firebase já inicializado
const storage = getStorage(getApp());

// Função para fazer upload da foto de perfil
export const uploadProfilePhoto = async (file, userId) => {
  if (!file) return null;

  try {
    const fileRef = storageRef(storage, `imgProfile/${userId}/${file.name}`);
    await uploadBytes(fileRef, file); // Faz o upload da imagem
    const downloadURL = await getDownloadURL(fileRef); // Obtém a URL da imagem
    return downloadURL;
  } catch (error) {
    console.error("Erro ao fazer upload da foto de perfil:", error);
    throw error;
  }
};
