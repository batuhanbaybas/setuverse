import { SETUP_TAG_ITEM_NAME_MAX } from '#/features/create-setup/lib/setup-tag-item-form'
import type { SetupTagItemFormValues } from '#/features/create-setup/lib/setup-tag-item-form'
import useAddSetupItem from '#/features/create-setup/service/setup-items/use-add-setup-item'
import {
  FormLabel,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from '#/shared/components/ui/form'
import { Input } from '#/shared/components/ui/input'
import { useFormContext } from 'react-hook-form'
import type { TagItemPositions } from '../../share/tag-canvas'

function SetupItemForm({
  itemsPositions,
  setupId,
}: {
  setupId: string
  itemsPositions: TagItemPositions
}) {
  const form = useFormContext<SetupTagItemFormValues>()
  const addItem = useAddSetupItem(setupId)

  const {
    reset,
    formState: { isSubmitSuccessful },
  } = form

  const handleSubmit = async (values: SetupTagItemFormValues) => {
    await addItem.mutateAsync({
      setupId: setupId,
      name: values.name,
      url: values.url,
      x: Number(itemsPositions.x),
      y: Number(itemsPositions.y),
    })
    if (isSubmitSuccessful) {
      reset()
    }
  }

  return (
    <form
      id="setup-item-form"
      className="space-y-4"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name{' '}
              <span className="text-destructive" aria-hidden>
                *
              </span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Monitor, keyboard, desk..."
                autoComplete="off"
                maxLength={SETUP_TAG_ITEM_NAME_MAX}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              URL{' '}
              <span className="text-destructive" aria-hidden>
                *
              </span>
            </FormLabel>
            <FormControl>
              <Input placeholder="https://..." autoComplete="off" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {form.formState.errors.root ? (
        <p className="text-sm text-destructive">
          {form.formState.errors.root.message}
        </p>
      ) : null}
    </form>
  )
}

export default SetupItemForm
