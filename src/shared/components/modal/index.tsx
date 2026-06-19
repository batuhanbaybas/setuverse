import type { ComponentProps, PropsWithChildren } from 'react'
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from './dialog'
import { Button } from '../ui/button'

type FooterActionButtonType = 'submit' | 'cancel'

interface FooterActionProps extends Omit<
  ComponentProps<typeof Button>,
  'type'
> {
  type: FooterActionButtonType
  buttonProps?: ComponentProps<typeof Button>
}

interface Props {
  rootProps?: ComponentProps<typeof Dialog>
  triggerProps?: ComponentProps<typeof DialogTrigger>
  contentProps?: ComponentProps<typeof DialogContent>
  headerProps?: ComponentProps<typeof DialogHeader>
  titleProps?: ComponentProps<typeof DialogTitle>
  descriptionProps?: ComponentProps<typeof DialogDescription>
  footerActions?: FooterActionProps[]
}

function Modal({
  rootProps,
  triggerProps,
  contentProps,
  headerProps,
  titleProps,
  descriptionProps,
  children,
  footerActions,
}: PropsWithChildren<Props>) {
  const renderFooterButtons = (footerAction: FooterActionProps) => {
    switch (footerAction.type) {
      case 'submit':
        return <Button type="submit" {...footerAction.buttonProps} />
      case 'cancel':
        return (
          <DialogClose asChild>
            <Button type="button" {...footerAction.buttonProps} />
          </DialogClose>
        )
      default:
        return null
    }
  }

  return (
    <Dialog {...rootProps}>
      {triggerProps ? <DialogTrigger {...triggerProps} /> : null}
      <DialogContent {...contentProps}>
        <DialogHeader {...headerProps}>
          <DialogTitle {...titleProps} />
          {descriptionProps ? (
            <DialogDescription {...descriptionProps} />
          ) : null}
        </DialogHeader>
        {children}
        {footerActions ? (
          <DialogFooter>
            {footerActions.map((action) => renderFooterButtons(action))}
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
