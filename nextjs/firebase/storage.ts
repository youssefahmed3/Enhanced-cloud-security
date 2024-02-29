import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from './config'; // Import your Firebase configuration
import { v4 as uuidv4 } from 'uuid';
import { storage } from './config';

async function uploadImage(file: any, filename: string) {
    let uuid = uuidv4();
    try {
      /*   // Create a unique file name to avoid conflicts
        const fileName = Date.now() + '-' + uuid;
        const storageRef = ref(storage, `images/${file.name}`);

        // Upload the image to Firebase Storage
        await uploadBytes(storageRef, file);

        // Return the download URL for the uploaded image
        const url = await getDownloadURL(storageRef);
        return url; */

        if(file == null) return

        const imageRef = ref(storage, `images/${file.name + uuidv4()}`);

        uploadBytes(imageRef, file).then(() => {
          alert('Image uploaded successfully');
        })
    } catch (error) {
        console.error('Error uploading image:', error);
        // Handle errors appropriately, e.g., display an error message to the user
    }
}

export {uploadImage}