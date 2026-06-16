import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Icon from '#/shared/components/icons'
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
  isPending?: boolean
  initialValues?: SetupTagItemFormValues
  onSubmit: (values: SetupTagItemFormValues) => void | Promise<void>
}

function TagItemDialog({
  open,
  onOpenChange,
  isEditing = false,
  isPending = false,
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

  const handleSubmit = async (values: SetupTagItemFormValues) => {
    try {
      await onSubmit(values)
      onOpenChange(false)
    } catch (error) {
      form.setError('root', {
        message:
          error instanceof Error ? error.message : 'Something went wrong',
      })
    }
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

            {form.formState.errors.root ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </p>
            ) : null}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Icon name="loader" className="size-4 animate-spin" />
                ) : null}
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
