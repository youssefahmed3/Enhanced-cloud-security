
import { db } from "@/firebase/config";
import { addDoc, doc, collection, setDoc, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model";
import { UserType } from "../modeltypes/modelTypes";



export async function addUser(newUser: UserType) {
  const user = new User(newUser.id as string, newUser.username, newUser.email, newUser.avatar, newUser.createdAt, newUser.updatedAt);
  await setDoc(doc(db, 'users', user.id), user.toFirestore());
}

export async function getUserById(userId: string) {
  const userRef = doc(db, "users", `${userId}`); // Create a reference to the user document
  try {
    const userSnap = await getDoc(userRef); // Get the document snapshot

    if (userSnap.exists()) {
      return User.fromFirestore(userSnap); // Pass the DocumentSnapshot to fromFirestore
    } else {
      return null; // Indicate that no user was found
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Indicate an error occurred
  }
}
