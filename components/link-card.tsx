"use client";

import { useState } from "react";
import { Edit2, Trash2, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { LinkItem } from "@/data/links";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "제목을 입력해주세요." })
    .max(50, { message: "제목은 50자를 초과할 수 없습니다." }),
  url: z
    .string()
    .min(1, { message: "URL을 입력해주세요." })
    .regex(/^(https?:\/\/)?([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})([\/\w \.-]*)*\/?$/, {
      message: "유효한 형식의 URL을 입력해주세요. (예: example.com)",
    })
    .refine((val) => {
      let finalUrl = val.trim();
      if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
        finalUrl = "https://" + finalUrl;
      }
      try {
        new URL(finalUrl);
        return true;
      } catch {
        return false;
      }
    }, { message: "유효한 형식의 URL을 입력해주세요. (예: example.com)" }),
});

interface LinkCardProps {
  link: LinkItem;
  onUpdate: (id: string, title: string, url: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function LinkCard({ link, onUpdate, onDelete }: LinkCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: link.title,
      url: link.url,
    },
    mode: "onChange",
  });

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    reset({
      title: link.title,
      url: link.url,
    });
    setIsEditing(false);
  };

  const onSubmitEdit = async (values: z.infer<typeof formSchema>) => {
    let finalUrl = values.url.trim();
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }
    
    setIsSubmitting(true);
    try {
      await onUpdate(link.id, values.title.trim(), finalUrl);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update link", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(link.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete link", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isEditing) {
    return (
      <Card className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] outline-none ring-offset-background focus-within:ring-2 focus-within:ring-zinc-400 focus-within:ring-offset-2 overflow-hidden py-1">
        <form onSubmit={handleSubmit(onSubmitEdit)} className="p-4 space-y-4">
          <div className="space-y-4">
            <Controller
              control={control}
              name="title"
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <Label htmlFor={`edit-title-${link.id}`} className={fieldState.error ? "text-destructive" : ""}>표시 제목 (Title)</Label>
                  <Input
                    id={`edit-title-${link.id}`}
                    placeholder="예: 내 포트폴리오, GitHub, Twitter"
                    autoComplete="off"
                    aria-invalid={!!fieldState.error}
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-[13px] text-destructive font-medium">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="url"
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <Label htmlFor={`edit-url-${link.id}`} className={fieldState.error ? "text-destructive" : ""}>주소 (URL)</Label>
                  <Input
                    id={`edit-url-${link.id}`}
                    placeholder="https://example.com"
                    autoComplete="off"
                    type="text"
                    aria-invalid={!!fieldState.error}
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-[13px] text-destructive font-medium">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelEdit}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              저장
            </Button>
          </div>
        </form>
      </Card>
    );
  }

  return (
    <>
      <Card className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300">
        <div className="flex items-center min-w-0">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center p-2.5 sm:p-3 min-w-0 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 rounded-2xl"
          >
            {/* 파비콘 아이콘 */}
            {link.icon ? (
              <div className="w-12 h-12 flex-shrink-0 mr-4 rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-white flex items-center justify-center p-2.5 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={link.icon}
                  alt={`${link.title} icon`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-12 h-12 flex-shrink-0 mr-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shadow-sm" />
            )}
            
            {/* 타이틀 텍스트 */}
            <div className="flex-1 font-medium text-[14px] sm:text-[15px] tracking-tight group-hover:text-zinc-900 dark:group-hover:text-zinc-50 text-zinc-700 dark:text-zinc-300 transition-colors truncate pr-4">
              {link.title}
            </div>
          </a>

          {/* 우측 상시 액션 버튼 */}
          <div className="flex items-center gap-1 p-2.5 sm:p-3 pl-0 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              onClick={handleEditClick}
              aria-label="수정"
              title="수정"
            >
              <Edit2 className="w-4.5 h-4.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-zinc-400 hover:text-red-600 dark:hover:text-red-500"
              onClick={handleDeleteClick}
              aria-label="삭제"
              title="삭제"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
            <DialogDescription className="pt-2 space-y-2">
              <span className="block font-medium text-zinc-900 dark:text-zinc-100">
                "{link.title}"
              </span>
              <span className="block text-red-600 dark:text-red-500 font-medium pt-1">
                이 작업은 되돌릴 수 없습니다.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              삭제하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
