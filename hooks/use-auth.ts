import { useState, useEffect } from "react";
import { User, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export interface UserProfile {
  uid: string;
  email: string | null;
  username: string | null;
  displayName: string;
  photoURL: string | null;
  bio?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        let currentProfile: UserProfile;

        if (!userSnap.exists()) {
          // 최초 로그인 시에만 기본값 세팅
          const emailPrefix = currentUser.email ? currentUser.email.split('@')[0] : 'user';
          currentProfile = {
            uid: currentUser.uid,
            email: currentUser.email,
            username: currentUser.displayName,
            displayName: emailPrefix,
            photoURL: currentUser.photoURL,
            bio: "",
          };
          await setDoc(userRef, currentProfile);
        } else {
          // 기존 유저일 경우 기존 데이터 유지
          currentProfile = userSnap.data() as UserProfile;
        }

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
