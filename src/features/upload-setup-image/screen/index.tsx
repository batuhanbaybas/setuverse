import { uploadSetupImageFormSchema } from '../lib/form-schema'
import type { UploadSetupImageFormSchema } from '../lib/form-schema'
import { useForm } from 'react-hook-form'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

function UploadSetupImageScreen() {
  const form = useForm({
    resolver: standardSchemaResolver(uploadSetupImageFormSchema),
    defaultValues: {
      image: undefined,
    },
  })

  const { handleSubmit, formState: { errors } } = form

  const onSubmit = (data: UploadSetupImageFormSchema) => {
    console.log(data)
  }

  return (
    <div>index</div>
  )
}

export default UploadSetupImageScreen