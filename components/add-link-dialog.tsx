"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

interface AddLinkDialogProps {
  onAddLink: (title: string, url: string) => void;
}

export function AddLinkDialog({ onAddLink }: AddLinkDialogProps) {
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
    mode: "onChange",
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    let finalUrl = values.url.trim();
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }
    
    onAddLink(values.title.trim(), finalUrl);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={
        <Button className="w-full rounded-2xl h-14 shadow-sm font-medium">
          <Plus className="w-4 h-4 mr-2" /> 새 링크 추가
        </Button>
      } />
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>새 링크 추가</DialogTitle>
            <DialogDescription>
              프로필에 표시할 링크 제목과 주소를 입력해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Controller
              control={control}
              name="title"
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Label htmlFor="title" className={fieldState.error ? "text-destructive" : ""}>표시 제목 (Title)</Label>
                  <Input
                    id="title"
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
                <div className="space-y-2">
                  <Label htmlFor="url" className={fieldState.error ? "text-destructive" : ""}>주소 (URL)</Label>
                  <Input
                    id="url"
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
          <DialogFooter>
            <Button type="submit">
              추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
