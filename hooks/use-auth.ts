import { useState, useEffect } from "react";
import { User, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // 로그인 상태일 때 유저 정보를 Firestore에 병합(저장)
        const userRef = doc(db, "users", currentUser.uid);
        const emailPrefix = currentUser.email ? currentUser.email.split('@')[0] : 'user';

        await setDoc(userRef, {
          uid: currentUser.uid,
          email: currentUser.email,
          username: currentUser.displayName,
          displayName: emailPrefix,
          photoURL: currentUser.photoURL,
        }, { merge: true });
        
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return { user, loading, signInWithGoogle, signOut };
}
