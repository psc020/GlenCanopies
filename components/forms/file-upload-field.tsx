import { ImagePlus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FileUploadFieldProps = {
  id: string;
  name: string;
  error?: string;
};

export function FileUploadField({ id, name, error }: FileUploadFieldProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor={id}>Upload Image</Label>
      <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-card p-5">
        <div className="mb-3 inline-flex size-10 items-center justify-center rounded-2xl bg-[#1D1D1D] text-white">
          <ImagePlus className="size-5" />
        </div>
        <Input
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          aria-describedby={error ? `${id}-error` : undefined}
          id={id}
          name={name}
          type="file"
        />
        <p className="mt-3 text-xs leading-6 text-slate-500">
          Optional. Upload a photo of the entrance or frontage to help with the quote.
        </p>
      </div>
      {error ? (
        <p className="text-sm font-medium text-red-600" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
