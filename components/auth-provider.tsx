"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, runTransaction } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export interface UserProfile {
  uid: string;
  email: string | null;
  username: string | null;
  displayName: string;
  photoURL: string | null;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticating: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // 프로필 생성 로직 - 트랜잭션 내부에서 존재 여부를 다시 확인하여 원자성 보장
        try {
          await runTransaction(db, async (transaction) => {
            const userRef = doc(db, "users", currentUser.uid);
            const userSnap = await transaction.get(userRef);

            // 이미 프로필이 존재하면 아무것도 하지 않음
            if (userSnap.exists()) {
              return;
            }

            // 최초 로그인 시 기본 프로필 생성
            const emailPrefix = currentUser.email ? currentUser.email.split('@')[0] : 'user';
            const baseName = emailPrefix;
            
            // 중복되지 않는 고유한 displayName 찾기
            let finalDisplayName = baseName;
            let counter = 0;
            let isUnique = false;
            
            while (!isUnique && counter < 100) {
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

            if (!isUnique) {
              throw new Error(`Failed to generate a unique displayName after 100 attempts for ${baseName}`);
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
          });
        } catch (error) {
          console.error("Error ensuring user profile:", error);
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

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticating, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
