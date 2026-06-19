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
import useUpdateSetupItem from '#/features/create-setup/service/setup-items/use-update-setup-item'

interface Props {
  setupId: string
  itemsPositions: TagItemPositions
  itemId?: string
}

function SetupItemForm({ setupId, itemsPositions, itemId }: Props) {
  const form = useFormContext<SetupTagItemFormValues>()
  const addItem = useAddSetupItem(setupId)
  const updateItem = useUpdateSetupItem(setupId)

  const isEditing = Boolean(itemId)

  const { reset } = form

  const handleSubmit = async (values: SetupTagItemFormValues) => {
    if (isEditing && itemId) {
      await updateItem.mutateAsync({
        itemId: itemId,
        name: values.name,
        url: values.url,
      })
    } else {
      await addItem.mutateAsync({
        setupId: setupId,
        name: values.name,
        url: values.url,
        x: Number(itemsPositions.x),
        y: Number(itemsPositions.y),
      })
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
