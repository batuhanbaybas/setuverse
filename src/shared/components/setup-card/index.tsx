import SetupImage from '#/shared/components/setup-card/setup-image'
import Card from '../ui/card'
import SetupCardInfo from './setup-card-info'

interface Props {
  imageUrl: string
  title: string
  category: string
}

function SetupCard({ imageUrl, title, category }: Props) {
  return (
    <Card
      wrapperProps={{
        className:
          'overflow-hidden rounded-xl border transition-shadow pt-0 hover:shadow-2xl h-[400px]',
      }}
      cardContentProps={{
        className: 'space-y-3 sm:p-0',
        children: (
          <>
            <div className="grid aspect-video overflow-hidden bg-muted">
              <SetupImage
                imageUrl={imageUrl}
                alt="title"
                className="size-full object-cover"
              />
            </div>
            <SetupCardInfo title={title} category={category} />
          </>
        ),
      }}
    />
  )
}

export default SetupCard
