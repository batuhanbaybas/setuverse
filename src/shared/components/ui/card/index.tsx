import type { ComponentProps } from 'react'
import { CardContainer, CardContent, CardFooter, CardHeader } from './card-wrapper'


interface Props {
    wrapperProps?: ComponentProps<typeof CardContainer>
    cardHeaderProps?: ComponentProps<typeof CardHeader>
    cardContentProps?: ComponentProps<typeof CardContent>
    cardFooterProps?: ComponentProps<typeof CardFooter>
}


function Card({ wrapperProps, cardHeaderProps, cardContentProps, cardFooterProps }: Props) {
  return (
    <CardContainer {...wrapperProps}>
      {cardHeaderProps ? <CardHeader {...cardHeaderProps} /> : null}
      {cardContentProps ? <CardContent {...cardContentProps} /> : null}
      {cardFooterProps ? <CardFooter {...cardFooterProps} /> : null}
    </CardContainer>
  )
}

export default Card