import { uploadSetupImageFormSchema } from '../lib/form-schema'
import { useForm } from 'react-hook-form'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

function UploadSetupImageScreen() {
  const form = useForm({
    resolver: standardSchemaResolver(uploadSetupImageFormSchema),
    defaultValues: {
      image: undefined,
    },
  })
  return (
    <div>index</div>
  )
}

export default UploadSetupImageScreen