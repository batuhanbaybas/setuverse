import { useFormContext } from 'react-hook-form'
import Icon from '#/shared/components/icons'
import type { IconName } from '#/shared/components/icons/icon-list'
import Card from '#/shared/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/shared/components/ui/form'
import { Input } from '#/shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/shared/components/ui/select'
import { Textarea } from '#/shared/components/ui/textarea'
import type { CreateSetupFormValues } from '../../lib/create-setup-form'
import CardHeader from '../../shared/card-header'
import { Route } from '#/routes/_main/create'

function CharacterCount({
  value,
  max,
}: {
  value: string
  max: number
}) {
  return (
    <span className="pointer-events-none absolute right-3 bottom-2 text-xs text-muted-foreground">
      {value.length}/{max}
    </span>
  )
}

function SetupDetails() {
  const { control } = useFormContext<CreateSetupFormValues>()
  const {categories} =Route.useRouteContext()

  return (
    <div className="col-span-12 md:col-span-4">
      <Card
        cardHeaderProps={{
          children: (
            <CardHeader
              step={2}
              title="Setup Details"
              description="Add a title, description, and category so people can discover your setup."
            />
          ),
        }}
        cardContentProps={{
          children: (
            <div className="flex flex-col gap-6">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <span className="text-destructive">*</span>
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        maxLength={60}
                        placeholder="Minimal Developer Setup"
                      />
                    </FormControl>
                    <CharacterCount value={field.value} max={60} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Textarea
                        {...field}
                        maxLength={200}
                        rows={4}
                        placeholder="Clean and minimal setup for coding and productivity."
                        className="min-h-28 resize-none pb-8"
                      />
                    </FormControl>
                    <CharacterCount value={field.value} max={200} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="categoryId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <span className="flex items-center gap-2">
                              {category.icon ? (
                                <Icon
                                  name={category.icon as IconName}
                                  className="size-4 text-muted-foreground"
                                />
                              ) : null}
                              {category.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
        ),
      }}
    />
    </div>
  )
}

export default SetupDetails
