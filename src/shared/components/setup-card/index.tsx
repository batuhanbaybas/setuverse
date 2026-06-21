import SetupImage from '#/shared/components/setup-card/setup-image'
import Card from '../ui/card'
import SetupCardInfo from './setup-card-info'

export type PublisherInfo = {
  name: string
  avatarUrl: string
}

interface Props {
  setupId?: string
  imageUrl: string
  title: string
  category: string
  publisherInfo?: PublisherInfo
  likesCount?: number
}

function SetupCard({
  setupId,
  imageUrl,
  title,
  category,
  publisherInfo,
  likesCount,
}: Props) {
  return (
    <Card
      wrapperProps={{
        className:
          'overflow-hidden rounded-xl border transition-shadow pt-0 hover:shadow-2xl h-[410px] cursor-pointer hover:scale-105 transition-all duration-300',
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
            <SetupCardInfo
              setupId={setupId ?? ''}
              title={title}
              category={category}
              publisherInfo={publisherInfo}
              likesCount={likesCount}
            />
          </>
        ),
      }}
    />
  )
}

export default SetupCard
