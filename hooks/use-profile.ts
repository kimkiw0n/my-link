import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc, collection, query, where, getDocs, getDoc, runTransaction } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { useAuth, UserProfile } from "@/hooks/use-auth";

export function useProfileQuery(uid: string | undefined) {
  return useQuery({
    queryKey: ["profile", uid],
    queryFn: async () => {
      if (!uid) return null;
      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        return snap.data() as UserProfile;
      }
      return null;
    },
    enabled: !!uid,
  });
}

export function useUpdateProfileMutation() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ field, value }: { field: "username" | "bio"; value: string }) => {
      if (!user) throw new Error("User not authenticated");
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { [field]: value });
    },
    onMutate: async ({ field, value }) => {
      if (!user) return { previousProfile: null };
      
      // 낙관적 업데이트 적용
      await queryClient.cancelQueries({ queryKey: ["profile", user.uid] });
      const previousProfile = queryClient.getQueryData<UserProfile>(["profile", user.uid]);
      
      if (previousProfile) {
        queryClient.setQueryData<UserProfile>(["profile", user.uid], {
          ...previousProfile,
          [field]: value,
        });
      }
      return { previousProfile };
    },
    onError: (err, variables, context) => {
      // 롤백
      if (user && context?.previousProfile) {
        queryClient.setQueryData(["profile", user.uid], context.previousProfile);
      }
      toast.error("프로필 업데이트 중 오류가 발생했습니다.");
      console.error(err);
    },
    onSettled: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: ["profile", user.uid] });
      }
    },
    onSuccess: () => {
      toast.success("프로필이 업데이트되었습니다.", { duration: 1000 });
    },
  });
}

export function useUpdateDisplayNameMutation(setDisplayNameError: (err: string | null) => void) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newName: string) => {
      if (!user) throw new Error("User not authenticated");

      return await runTransaction(db, async (transaction) => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await transaction.get(userRef);
        
        if (!userSnap.exists()) throw new Error("User profile not found");
        
        const userData = userSnap.data() as UserProfile;
        const oldName = userData.displayName;

        // 이름이 변경되지 않은 경우 처리 안 함
        if (oldName === newName) return "success";

        // 1. 새 이름이 다른 사람에 의해 선점되었는지 확인
        const newMappingRef = doc(db, "displayNames", newName);
        const newMappingSnap = await transaction.get(newMappingRef);
        
        if (newMappingSnap.exists()) {
          const mappingData = newMappingSnap.data() as { uid: string };
          if (mappingData.uid !== user.uid) {
            return "duplicate";
          }
        }

        // 2. 기존 이름 매핑 삭제
        if (oldName) {
          const oldMappingRef = doc(db, "displayNames", oldName);
          transaction.delete(oldMappingRef);
        }

        // 3. 새 이름 매핑 생성
        transaction.set(newMappingRef, { uid: user.uid });

        // 4. 유저 프로필 업데이트
        transaction.update(userRef, { displayName: newName });
        
        return "success";
      });
    },
    onMutate: async (newName) => {
      if (!user) return { previousProfile: null };
      
      setDisplayNameError(null);
      await queryClient.cancelQueries({ queryKey: ["profile", user.uid] });
      const previousProfile = queryClient.getQueryData<UserProfile>(["profile", user.uid]);
      
      if (previousProfile && newName !== previousProfile.displayName) {
        queryClient.setQueryData<UserProfile>(["profile", user.uid], {
          ...previousProfile,
          displayName: newName,
        });
      }
      return { previousProfile };
    },
    onError: (err, newName, context) => {
      if (user && context?.previousProfile) {
        queryClient.setQueryData(["profile", user.uid], context.previousProfile);
      }
      toast.error("아이디 업데이트 중 오류가 발생했습니다.");
      console.error(err);
    },
    onSettled: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: ["profile", user.uid] });
      }
    },
    onSuccess: (result) => {
      if (result === "duplicate") {
        setDisplayNameError("이미 존재하는 아이디입니다.");
        return;
      }
      toast.success("아이디가 업데이트되었습니다.", { duration: 1000 });
    },
  });
}

export function useUpdateLinkOrderMutation() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (linkOrder: string[]) => {
      if (!user) throw new Error("User not authenticated");
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { linkOrder });
    },
    onMutate: async (linkOrder) => {
      if (!user) return { previousProfile: null };
      
      await queryClient.cancelQueries({ queryKey: ["profile", user.uid] });
      const previousProfile = queryClient.getQueryData<UserProfile>(["profile", user.uid]);
      
      if (previousProfile) {
        queryClient.setQueryData<UserProfile>(["profile", user.uid], {
          ...previousProfile,
          linkOrder,
        });
      }
      return { previousProfile };
    },
    onError: (err, newOrder, context) => {
      if (user && context?.previousProfile) {
        queryClient.setQueryData(["profile", user.uid], context.previousProfile);
      }
      toast.error("링크 순서 저장 중 오류가 발생했습니다.");
      console.error(err);
    },
    onSettled: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: ["profile", user.uid] });
      }
    },
  });
}
