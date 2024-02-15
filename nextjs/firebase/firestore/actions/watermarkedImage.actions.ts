import { db } from "@/firebase/config";
import { addDoc, doc, collection, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import WatermarkedImage from "../models/watermarkedImage.model";
import { WatermarkedImageType } from "../modeltypes/modelTypes";



export async function addWatermarkedImage(newWatermarkedImage: WatermarkedImageType) {
  const watermarkedImage = new WatermarkedImage(uuidv4(), newWatermarkedImage.name, newWatermarkedImage.watermarkId, newWatermarkedImage.watermarkedUrl, newWatermarkedImage.keypointsFeatures, newWatermarkedImage.descriptorsFeatures, newWatermarkedImage.userId, newWatermarkedImage.createdAt, newWatermarkedImage.updatedAt);
  await setDoc(doc(db, 'watermarkedImage', watermarkedImage.id), watermarkedImage.toFirestore());
}
