"use server";

import { db } from "@/lib/firebase";
import { doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";

/**
 * 특정 링크의 클릭 수를 1 증가시킵니다.
 * Firebase Client SDK를 사용하며, 보안 규칙에서 특정 조건(clickCount 필드만 +1)을 허용해야 합니다.
 */
export async function incrementClickCount(userId: string, linkId: string) {
  if (!userId || !linkId) {
    return { success: false, error: "Missing parameters" };
  }

  try {
    const linkRef = doc(db, "users", userId, "links", linkId);
    
    await updateDoc(linkRef, {
      clickCount: increment(1),
      updatedAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error incrementing click count:", error);
    return { 
      success: false, 
      error: error.message || "Failed to update click count",
      stack: error.stack
    };
  }
}
