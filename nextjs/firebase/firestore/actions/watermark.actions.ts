import { db } from "@/firebase/config";
import { addDoc, doc, collection, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Watermark from "../models/watermark.model";
import { WatermarkType } from "../modeltypes/modelTypes";


export async function addWatermark(newWatermark: WatermarkType, userId: string) {
  const watermark = new Watermark(uuidv4(), newWatermark.name, newWatermark.watermarkUrl, newWatermark.createdAt, newWatermark.updatedAt);
  await addDoc(collection(db, 'users', userId, 'watermarks'), watermark.toFirestore());
}
