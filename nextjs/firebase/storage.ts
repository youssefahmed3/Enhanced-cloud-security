import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from './config'; // Import your Firebase configuration
import { v4 as uuidv4 } from 'uuid';
import { storage } from './config';

async function uploadImage(file: any, filename: string) {
  let uuid = uuidv4();
  try {
    const imageRef =  ref(storage, `images/${file.name + uuid}`);

    await uploadBytes(imageRef, file)

    const imageUrl = await getDownloadURL(imageRef)
    return imageUrl
  } catch (error) {
    console.error('Error uploading image:', error);
    // Handle errors appropriately, e.g., display an error message to the user
  }
}

export { uploadImage }