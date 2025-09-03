"use client"

import { ImageIcon, UploadIcon, XIcon } from "lucide-react"
import {
  formatBytes,
  useFileUpload,
} from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import axios from "axios"

export default function MultipleFileComponent({ employerId }) {
  const maxSizeMB = 5
  const maxSize = maxSizeMB * 1024 * 1024
  const maxFiles = 6

  const [
    { files, isDragging },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: true,
    maxFiles,
  })

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUploadPhotos = async () => {
    if (files.length === 0) {
      setMessage("Please select a file to upload");
      return
    }
    setUploading(true)

    try {
      const formData = new FormData();

      formData.append("employerId", employerId);
      files.forEach((fileObj) => {
        formData.append("photos", fileObj.file)
      })

      const res = await axios.post("/api/upload-employer-photos", formData);
      if (res.data.success) {
        setMessage("File Uploaded Successfully");
        clearFiles();
      }
      else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setUploading(false)
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
        />
        <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
          <div
            className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <ImageIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 text-sm font-medium">Drop your images here</p>
          <p className="text-muted-foreground text-xs">
            SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={openFileDialog}
          >
            <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
            Select images
          </Button>
        </div>
      </div>

      {message && (
        <p className={`${message === "File Uploaded Successfully" ? "text-green-600" : "text-red-600"} mt-2 font-semibold text-sm`}>{message}</p>
      )}

      <button
        onClick={handleUploadPhotos}
        disabled={uploading}
        type="button"
        className="py-2 cursor-pointer px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-md mt-5 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="bg-accent aspect-square shrink-0 rounded">
                  <Image
                    src={file.preview}
                    width={100}
                    height={100}
                    quality={100}
                    priority
                    alt={file.file.name}
                    className="size-10 rounded-[inherit] object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate text-[13px] font-medium">
                    {file.file.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatBytes(file.file.size)}
                  </p>
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                onClick={() => removeFile(file.id)}
                aria-label="Remove file"
              >
                <XIcon aria-hidden="true" />
              </Button>
            </div>
          ))}

          {/* Remove all files button */}
          {files.length > 1 && (
            <div>
              <Button size="sm" variant="outline" onClick={clearFiles}>
                Remove all files
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
