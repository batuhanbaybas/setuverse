import { zodResolver } from '@hookform/resolvers/zod'
import type { Resolver } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import AddPhoto from '../components/add-photo'
import SetupDetails from '../components/setup-details'
import TagEquipment from '../components/tag-equipment'
import {
  createSetupDefaultValues,
  createSetupFormSchema,
} from '../lib/create-setup-form'
import type { CreateSetupFormValues } from '../lib/create-setup-form'

function CreateSetupPage() {
  const form = useForm<CreateSetupFormValues>({
    resolver: zodResolver(
      createSetupFormSchema as never,
    ) as Resolver<CreateSetupFormValues>,
    defaultValues: createSetupDefaultValues,
    mode: 'onChange',
  })

  return (
    <FormProvider {...form}>
      <section className="mx-auto w-full py-16">
        <div className="grid grid-cols-12 items-start gap-8">
          <AddPhoto />
          <SetupDetails />
        </div>

        <div className="mt-8 grid grid-cols-12 items-start gap-8">
          <TagEquipment />
        </div>
      </section>
    </FormProvider>
  )
}

export default CreateSetupPage
