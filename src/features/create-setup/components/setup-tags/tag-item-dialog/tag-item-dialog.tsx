import Modal from '#/shared/components/modal'
import type { ComponentProps } from 'react'

import type { TagItemPositions } from '../../share/tag-canvas'
import { Form } from '#/shared/components/ui/form'
import { useForm } from 'react-hook-form'
import {
  setupTagItemFormDefaultValues,
  setupTagItemFormSchema,
} from '#/features/create-setup/lib/setup-tag-item-form'
import type { SetupTagItemFormValues } from '#/features/create-setup/lib/setup-tag-item-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import getSetupItemDetail from '#/features/create-setup/server/setup-item/get-setup-item-detail'
import SetupItemForm from './setup-item-form'

type TagItemDialogProps = {
  isEditing?: boolean
  triggerProps: ComponentProps<typeof Modal>['triggerProps']
  itemsPositions?: TagItemPositions
  setupId: string
  itemId?: string
}

function TagItemDialog({
  triggerProps,
  setupId,
  itemId,
  itemsPositions,
}: TagItemDialogProps) {
  const isEditing = Boolean(itemId)
  const form = useForm<SetupTagItemFormValues>({
    resolver: standardSchemaResolver(setupTagItemFormSchema),
    defaultValues: async () => {
      if (itemId) {
        const setupItem = await getSetupItemDetail({ data: { id: itemId } })
        if (setupItem) {
          return {
            name: setupItem.name,
            url: setupItem.url,
          }
        }
      }
      return setupTagItemFormDefaultValues
    },
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
            disabled: false,
            type: 'submit',
            children: isEditing ? 'Save changes' : 'Add tag',
          },
        },
      ]}
      triggerProps={triggerProps}
    >
      <Form {...form}>
        <SetupItemForm
          setupId={setupId}
          itemsPositions={itemsPositions ?? { x: 0, y: 0 }}
          itemId={itemId}
        />
      </Form>
    </Modal>
  )
}

export default TagItemDialog
