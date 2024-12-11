'use client';

import { db } from './client';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function addToWaitlist(email: string) {
  try {
    const docRef = await addDoc(collection(db, 'waitlist'), {
      email,
      timestamp: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return { success: false, error };
  }
}
