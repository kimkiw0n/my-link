"use client";

import { useContext } from "react";
import { AuthContext, UserProfile } from "@/components/auth-provider";

export type { UserProfile };

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
