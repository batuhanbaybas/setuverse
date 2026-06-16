import type { SetupItemInput } from '../server/lib/setup-input-schemas'

export type TagItemDraft = SetupItemInput & {
  clientId: string
}

export function createTagItemDraft(
  item: SetupItemInput,
  clientId: string = crypto.randomUUID(),
): TagItemDraft {
  return {
    clientId,
    ...item,
  }
}

export function tagItemDraftToInput(item: TagItemDraft): SetupItemInput {
  return {
    name: item.name,
    url: item.url,
    x: item.x,
    y: item.y,
  }
}

export function tagItemsFromDraft(
  items: Array<{
    id: string
    name: string
    url: string
    x: number
    y: number
  }>,
): TagItemDraft[] {
  return items.map((item) =>
    createTagItemDraft(
      {
        name: item.name,
        url: item.url,
        x: item.x,
        y: item.y,
      },
      item.id,
    ),
  )
}
