import { db } from "@/firebase/config";
import { addDoc, doc, collection, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import WatermarkedImage from "../models/watermarkedImage.model";
import { WatermarkedImageType } from "../modeltypes/modelTypes";



export async function addWatermarkedImage(newWatermarkedImage: WatermarkedImageType, userId: string) {
  const watermarkedImage = new WatermarkedImage(uuidv4(), newWatermarkedImage.name, newWatermarkedImage.watermarkUrl, newWatermarkedImage.baseUrl, newWatermarkedImage.watermarkedUrl, newWatermarkedImage.createdAt, newWatermarkedImage.updatedAt);
  await addDoc(collection(db, 'users', userId, "watermarkedImages"), watermarkedImage.toFirestore());
}
