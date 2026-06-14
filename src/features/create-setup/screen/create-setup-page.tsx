import { FormProvider, useForm } from 'react-hook-form'
import AddPhoto from '../components/add-photo'
import type { CreateSetupFormValues } from '../lib/create-setup-form'
import { createSetupDefaultValues } from '../lib/create-setup-form'

type CreateSetupPageProps = {
  userName: string
}

function CreateSetupPage({ userName }: CreateSetupPageProps) {
  const form = useForm<CreateSetupFormValues>({
    defaultValues: createSetupDefaultValues,
    mode: 'onChange',
  })

  return (
    <FormProvider {...form}>
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header>
          <h1 className="text-4xl font-bold">Create Setup</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Welcome back, {userName}. Start building your card set.
          </p>
        </header>

        <AddPhoto />
      </section>
    </FormProvider>
  )
}

export default CreateSetupPage
