import { db } from "@/firebase/config";
import { addDoc, doc, collection, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model";
import { UserType } from "../modeltypes/modelTypes";



export async function addUser(newUser: UserType) {
  const user = new User(uuidv4(), newUser.firstname, newUser.lastname, newUser.username, newUser.email, newUser.avatar, newUser.createdAt, newUser.updatedAt);
  await setDoc(doc(db, 'users', user.id), user.toFirestore());
}
