import { Stepper } from '#/shared/components/ui/stepper'
import { Outlet, createFileRoute, useParams, useRouter } from '@tanstack/react-router'
import { useMemo } from 'react'

export const Route = createFileRoute('/_main/_create')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = useParams({ strict: false })
  const router = useRouter()

  const steps = useMemo(() => {
    return [
        { label: 'Upload Image', type: 'link', to: '/create/' },
        { label: 'Setup Info', type: 'link', to: `/create/${id}/info` },
        { label: 'Tag Items', type: 'link', to: `/create/${id}/tags` },
        { label: 'Review', type: 'link', to: `/create/${id}/review` },
    ]
  }, [id])

  const currentStepIndex = useMemo(() => {
    return steps.findIndex(step => step.type === 'link' && step.to === router.state.location.pathname)
  }, [steps, router.state.location.pathname])

  return (
    <div className='py-10'>
      <Stepper steps={steps} currentStep={currentStepIndex} />
      <Outlet />
    </div>
  )
}
