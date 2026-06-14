import { zodResolver } from '@hookform/resolvers/zod'
import type { Resolver } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import AddPhoto from '../components/add-photo'
import SetupDetails from '../components/setup-details'
import {
  createSetupDefaultValues,
  createSetupFormSchema,
} from '../lib/create-setup-form'
import type { CreateSetupFormValues } from '../lib/create-setup-form'

type CreateSetupPageProps = {
  userName: string
}

function CreateSetupPage({ userName }: CreateSetupPageProps) {
  const form = useForm<CreateSetupFormValues>({
    resolver: zodResolver(
      createSetupFormSchema as never,
    ) as Resolver<CreateSetupFormValues>,
    defaultValues: createSetupDefaultValues,
    mode: 'onChange',
  })

  return (
    <FormProvider {...form}>
      <section className="mx-auto grid w-full grid-cols-12 gap-8 py-16">
        <AddPhoto />
        <SetupDetails />
      </section>
    </FormProvider>
  )
}

export default CreateSetupPage
