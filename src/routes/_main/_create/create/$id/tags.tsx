import { getSetupDraftFn } from '#/features/create-setup/server/get-setup-draft.functions'
import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const SetupTags = lazy(
  () => import('#/features/create-setup/components/setup-tags'),
)

export const Route = createFileRoute('/_main/_create/create/$id/tags')({
  loader: async ({ params }) => {
    const draft = await getSetupDraftFn({ data: { setupId: params.id } })

    return {
      imageUrl: draft.imageUrl,
      items: draft.items,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { imageUrl, items } = Route.useLoaderData()
  const { id } = Route.useParams()

  if (!imageUrl) {
    return (
      <section className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
        No setup image found. Upload an image first to start tagging items.
      </section>
    )
  }

  return (
    <ClientOnly>
      <Suspense fallback={null}>
        <SetupTags imageUrl={imageUrl} setupId={id} initialItems={items} />
      </Suspense>
    </ClientOnly>
  )
}
