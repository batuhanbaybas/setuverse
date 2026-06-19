import Modal from '#/shared/components/modal'
import type { ComponentProps } from 'react'

import SetupItemForm from './setup-item-form'
import type { TagItemPositions } from '../../share/tag-canvas'
import { Form } from '#/shared/components/ui/form'
import { useForm } from 'react-hook-form'
import {
  setupTagItemFormDefaultValues,
  setupTagItemFormSchema,
} from '#/features/create-setup/lib/setup-tag-item-form'
import type { SetupTagItemFormValues } from '#/features/create-setup/lib/setup-tag-item-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

type TagItemDialogProps = {
  isEditing?: boolean
  triggerProps: ComponentProps<typeof Modal>['triggerProps']
  itemsPositions: TagItemPositions
  setupId: string
}

function TagItemDialog({
  isEditing = false,
  triggerProps,
  setupId,
  itemsPositions,
}: TagItemDialogProps) {
  const isPending = false
  const form = useForm<SetupTagItemFormValues>({
    resolver: standardSchemaResolver(setupTagItemFormSchema),
    defaultValues: setupTagItemFormDefaultValues,
  })

  const {
    formState: { isValid },
  } = form

  return (
    <Modal
      titleProps={{
        children: isEditing ? 'Edit tagged item' : 'Add tagged item',
      }}
      footerActions={[
        {
          type: 'cancel',
          buttonProps: {
            variant: 'outline',
            disabled: false,
            children: 'Cancel',
          },
        },
        {
          type: isValid ? 'cancel' : 'submit',
          buttonProps: {
            form: 'setup-item-form',
            disabled: isPending,
            type: 'submit',
            children: isEditing ? 'Save changes' : 'Add tag',
          },
        },
      ]}
      triggerProps={triggerProps}
    >
      <Form {...form}>
        <SetupItemForm setupId={setupId} itemsPositions={itemsPositions} />
      </Form>
    </Modal>
  )
}

export default TagItemDialog
