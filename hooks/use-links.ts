import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { LinkItem } from "@/data/links";
import { toast } from "sonner";

export function useLinksQuery(uid: string | undefined) {
  return useQuery({
    queryKey: ["links", uid],
    queryFn: async () => {
      if (!uid) return [];
      const q = query(collection(db, `users/${uid}/links`), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedLinks: LinkItem[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedLinks.push({
          id: doc.id,
          title: data.title,
          url: data.url,
          icon: data.icon,
          clickCount: data.clickCount || 0,
          updatedAt: data.updatedAt?.toDate?.()?.toLocaleString('ko-KR'),
        });
      });
      return fetchedLinks;
    },
    enabled: !!uid,
  });
}

export function useAddLinkMutation(uid: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ title, url }: { title: string; url: string }) => {
      if (!uid) throw new Error("User not authenticated");
      const urlObject = new URL(url);
      const domain = urlObject.hostname;
      await addDoc(collection(db, `users/${uid}/links`), {
        title,
        url,
        icon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        clickCount: 0,
        createdAt: serverTimestamp(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", uid] });
      console.log("Firebase에 링크가 성공적으로 저장되었습니다.");
    },
    onError: (e) => {
      console.error("Invalid URL or Firestore Error:", e);
      toast.error("링크 추가 중 오류가 발생했습니다.");
    }
  });
}

export function useUpdateLinkMutation(uid: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, title, url }: { id: string; title: string; url: string }) => {
      if (!uid) throw new Error("User not authenticated");
      const urlObject = new URL(url);
      const domain = urlObject.hostname;
      const linkRef = doc(db, `users/${uid}/links`, id);
      await updateDoc(linkRef, {
        title,
        url,
        icon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        updatedAt: serverTimestamp(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", uid] });
      console.log("Firebase 링크가 성공적으로 수정되었습니다.");
    },
    onError: (e) => {
      console.error("Error updating link:", e);
      toast.error("링크 수정 중 오류가 발생했습니다.");
    }
  });
}

export function useDeleteLinkMutation(uid: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!uid) throw new Error("User not authenticated");
      const linkRef = doc(db, `users/${uid}/links`, id);
      await deleteDoc(linkRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", uid] });
      console.log("Firebase 링크가 성공적으로 삭제되었습니다.");
    },
    onError: (e) => {
      console.error("Error deleting link:", e);
      toast.error("링크 삭제 중 오류가 발생했습니다.");
    }
  });
}
