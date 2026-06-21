import useTriggerLikeSetup from '#/features/home/service/use-trigger-like-setup'
import Icon from '../icons'
import { Button } from '../ui/button'

interface Props {
  setupId: string
}

function SetupLikeTrigger({ setupId }: Props) {
  const triggerLikeSetup = useTriggerLikeSetup()

  const handleTriggerLikeSetup = async () => {
    await triggerLikeSetup.mutateAsync({ setupId })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={(e) => {
        e.stopPropagation()
        handleTriggerLikeSetup()
      }}
    >
      <Icon name="heart" className="size-6" />
    </Button>
  )
}

export default SetupLikeTrigger
