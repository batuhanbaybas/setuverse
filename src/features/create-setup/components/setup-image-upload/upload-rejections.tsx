import type { FileRejection } from 'react-upload-kit'

type UploadRejectionsProps = {
  rejections: FileRejection[]
}

function UploadRejections({ rejections }: UploadRejectionsProps) {
  if (rejections.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      {rejections.map((rejection) => (
        <p
          key={`${rejection.file.name}-${rejection.errors[0]?.code}`}
          className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive"
        >
          {rejection.file.name}: {rejection.errors[0]?.message}
        </p>
      ))}
    </div>
  )
}

export default UploadRejections
