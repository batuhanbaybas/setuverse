import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
  
} from 'react'
import type {ReactNode} from 'react';

type CreateFlowSubmitRegistration = {
  submit: () => void | Promise<void>
  isReady?: boolean
  isSubmitting?: boolean
  hint?: string
  error?: string | null
}

type CreateFlowSubmitState = {
  isReady: boolean
  isSubmitting: boolean
  hint: string
  error: string | null
}

type CreateFlowContextValue = {
  triggerSubmit: () => void
  submitState: CreateFlowSubmitState
  registerSubmit: (registration: CreateFlowSubmitRegistration) => void
}

const defaultSubmitState: CreateFlowSubmitState = {
  isReady: false,
  isSubmitting: false,
  hint: '',
  error: null,
}

const CreateFlowContext = createContext<CreateFlowContextValue | null>(null)

function CreateFlowProvider({ children }: { children: ReactNode }) {
  const submitRef = useRef<(() => void | Promise<void>) | null>(null)
  const [submitState, setSubmitState] =
    useState<CreateFlowSubmitState>(defaultSubmitState)

  const registerSubmit = useCallback(
    (registration: CreateFlowSubmitRegistration) => {
      submitRef.current = registration.submit
      setSubmitState({
        isReady: registration.isReady ?? false,
        isSubmitting: registration.isSubmitting ?? false,
        hint: registration.hint ?? '',
        error: registration.error ?? null,
      })
    },
    [],
  )

  const triggerSubmit = useCallback(() => {
    void submitRef.current?.()
  }, [])

  const value = useMemo(
    () => ({
      triggerSubmit,
      submitState,
      registerSubmit,
    }),
    [triggerSubmit, submitState, registerSubmit],
  )

  return (
    <CreateFlowContext.Provider value={value}>
      {children}
    </CreateFlowContext.Provider>
  )
}

function useCreateFlowContext() {
  const context = useContext(CreateFlowContext)

  if (!context) {
    throw new Error('useCreateFlowContext must be used within CreateFlowProvider')
  }

  return context
}

function useCreateFlowSubmit({
  submit,
  isReady = false,
  isSubmitting = false,
  hint = '',
  error = null,
}: CreateFlowSubmitRegistration) {
  const { registerSubmit } = useCreateFlowContext()
  const submitRef = useRef(submit)

  submitRef.current = submit

  useEffect(() => {
    registerSubmit({
      submit: () => submitRef.current(),
      isReady,
      isSubmitting,
      hint,
      error,
    })
  }, [registerSubmit, isReady, isSubmitting, hint, error])

  useEffect(() => {
    return () => {
      registerSubmit({
        submit: () => {},
        ...defaultSubmitState,
      })
    }
  }, [registerSubmit])
}

export {
  CreateFlowProvider,
  useCreateFlowContext,
  useCreateFlowSubmit,
}
