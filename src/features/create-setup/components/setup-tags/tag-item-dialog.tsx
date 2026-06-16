import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '#/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/shared/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/shared/components/ui/form'
import { Input } from '#/shared/components/ui/input'

import {
  SETUP_TAG_ITEM_NAME_MAX,
  setupTagItemFormDefaultValues,
  setupTagItemFormSchema,
} from '../../lib/setup-tag-item-form'
import type { SetupTagItemFormValues } from '../../lib/setup-tag-item-form'

type TagItemDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  isEditing?: boolean
  initialValues?: SetupTagItemFormValues
  onSubmit: (values: SetupTagItemFormValues) => void
}

function TagItemDialog({
  open,
  onOpenChange,
  isEditing = false,
  initialValues,
  onSubmit,
}: TagItemDialogProps) {
  const form = useForm<SetupTagItemFormValues>({
    resolver: standardSchemaResolver(setupTagItemFormSchema),
    defaultValues: setupTagItemFormDefaultValues,
  })

  useEffect(() => {
    if (open) {
      form.reset(initialValues ?? setupTagItemFormDefaultValues)
    }
  }, [form, initialValues, open])

  const handleSubmit = (values: SetupTagItemFormValues) => {
    onSubmit(values)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit tagged item' : 'Add tagged item'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
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
                    <Input
                      placeholder="https://..."
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Save changes' : 'Add tag'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default TagItemDialog
