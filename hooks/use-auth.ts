import { useState, useEffect } from "react";
import { User, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, runTransaction } from "firebase/firestore";
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
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        let currentProfile: UserProfile;

        if (!userSnap.exists()) {
          // 최초 로그인 시에만 기본값 세팅
          const emailPrefix = currentUser.email ? currentUser.email.split('@')[0] : 'user';
          let baseName = emailPrefix;
          
          await runTransaction(db, async (transaction) => {
            const userRef = doc(db, "users", currentUser.uid);
            
            // 중복 시 뒤에 숫자를 붙여 유니크한 이름 찾기
            let finalDisplayName = baseName;
            let counter = 0;
            let isUnique = false;
            
            while (!isUnique && counter < 10) {
              const checkName = counter === 0 ? baseName : `${baseName}${counter}`;
              const mappingRef = doc(db, "displayNames", checkName);
              const mappingSnap = await transaction.get(mappingRef);
              
              if (!mappingSnap.exists()) {
                finalDisplayName = checkName;
                isUnique = true;
              } else {
                counter++;
              }
            }
            
            const newProfile: UserProfile = {
              uid: currentUser.uid,
              email: currentUser.email,
              username: currentUser.displayName || baseName,
              displayName: finalDisplayName,
              photoURL: currentUser.photoURL,
              bio: "",
            };
            
            transaction.set(userRef, newProfile);
            transaction.set(doc(db, "displayNames", finalDisplayName), { uid: currentUser.uid });
            currentProfile = newProfile;
          });
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
    if (isAuthenticating) return;
    
    setIsAuthenticating(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (
        error.code === "auth/cancelled-popup-request" || 
        error.code === "auth/popup-closed-by-user"
      ) {
        // User closed the popup or another request was made; ignore
        return;
      }
      console.error("Error signing in with Google:", error);
      throw error;
    } finally {
      setIsAuthenticating(false);
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

  return { user, loading, isAuthenticating, signInWithGoogle, signOut };
}
