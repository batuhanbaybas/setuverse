import Icon from '#/shared/components/icons'
import { Button } from '#/shared/components/ui/button'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { PROFILE_LINKS_MAX } from '../../lib/edit-profile-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/shared/components/ui/form'
import { Input } from '#/shared/components/ui/input'

function UrlAddField() {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  })

  const canAddLink = fields.length < PROFILE_LINKS_MAX

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-medium">Links</h2>
          <p className="text-sm text-muted-foreground">
            Add websites or social profiles.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canAddLink}
          onClick={() => append({ label: '', url: '' })}
        >
          <Icon name="plus" aria-hidden />
          Add link
        </Button>
      </div>

      <ul className="space-y-4">
        {fields.map((field, index) => (
          <li
            key={field.id}
            className="grid gap-4 rounded-lg border p-4 sm:grid-cols-[1fr_1fr_auto]"
          >
            <FormField
              control={control}
              name={`links.${index}.label`}
              render={({ field: linkField }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="GitHub"
                      autoComplete="off"
                      {...linkField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`links.${index}.url`}
              render={({ field: linkField }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/username"
                      autoComplete="off"
                      {...linkField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Remove link"
                onClick={() => remove(index)}
              >
                <Icon name="trash" aria-hidden />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UrlAddField
