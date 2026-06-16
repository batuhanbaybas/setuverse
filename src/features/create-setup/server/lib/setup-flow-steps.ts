export const SETUP_FLOW_STEPS = {
  IMAGE: 0,
  INFO: 1,
  ITEMS: 2,
  REVIEW: 3,
} as const

export type SetupFlowStep =
  (typeof SETUP_FLOW_STEPS)[keyof typeof SETUP_FLOW_STEPS]
