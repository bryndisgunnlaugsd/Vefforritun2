import { forwardRef, useState } from 'react'

interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  error?: string
  maxSizeMB?: number
  accept?: string
  initialFileNames?: string[]
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ label, error, maxSizeMB = 25, accept, onChange, initialFileNames, ...props }, ref) => {
    const [fileNames, setFileNames] = useState<string[]>(initialFileNames ?? [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      setFileNames(files.map((f) => f.name))
      onChange?.(e)
    }

    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer">
          <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
          <span className="text-xs text-gray-400 mt-1">{accept} — max {maxSizeMB}MB per file</span>
          <input type="file" ref={ref} accept={accept} onChange={handleChange} className="hidden" {...props} />
        </label>
        {fileNames.length > 0 && (
          <ul className="text-xs text-gray-600 mt-1">
            {fileNames.map((name) => <li key={name}>📎 {name}</li>)}
          </ul>
        )}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    )
  }
)

FileUpload.displayName = 'FileUpload'
export default FileUpload