"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InlineEditProps {
  value: string;
  onSave: (newValue: string) => Promise<void> | void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  textClassName?: string;
  prefix?: string;
  error?: string | null;
}

export function InlineEdit({ 
  value, 
  onSave, 
  placeholder = "입력해주세요", 
  className,
  inputClassName,
  textClassName,
  prefix = "",
  error
}: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (currentValue.trim() === value.trim()) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(currentValue.trim());
      setIsEditing(false);
    } catch (e) {
      // Error is handled by parent, we might stay in edit mode or parent sets error prop
      // For now, let's keep edit mode open if there's an error so user can fix it
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setCurrentValue(value);
      setIsEditing(false);
    }
  };

  return (
    <div className={cn("relative group flex flex-col items-center w-full", className)}>
      {isEditing ? (
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full max-w-[200px] flex items-center">
            {prefix && <span className="absolute left-3 text-zinc-500 z-10">{prefix}</span>}
            <Input
              ref={inputRef}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              disabled={isSaving}
              placeholder={placeholder}
              className={cn("text-center w-full bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus-visible:ring-blue-500", prefix && "pl-8", inputClassName, error && "border-red-500 focus-visible:ring-red-500")}
            />
          </div>
          {error && <span className="text-xs text-red-500 font-medium mt-1 absolute -bottom-5">{error}</span>}
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <div 
            onClick={() => setIsEditing(true)}
            className={cn(
              "cursor-pointer px-3 py-1 rounded-md transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent",
              !value && "text-zinc-400 italic",
              textClassName
            )}
            title="클릭하여 수정"
          >
            {prefix}{value || placeholder}
          </div>
          {error && <span className="text-xs text-red-500 font-medium mt-1 absolute -bottom-5">{error}</span>}
        </div>
      )}
    </div>
  );
}
