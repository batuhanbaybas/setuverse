import { CREATE_FLOW_STEPS } from './flow'

export { CREATE_FLOW_STEPS }

export const CREATE_STEPPER_STYLE = {
  activeBgColor: '#9558f6',
  activeTextColor: '#fafafa',
  completedBgColor: '#9558f6',
  completedTextColor: '#fafafa',
  inactiveBgColor: '#ffffff',
  inactiveTextColor: '#71717b',
  size: '2em',
  circleFontSize: '1rem',
  labelFontSize: '0.875rem',
  borderRadius: '50%',
  fontWeight: 500,
} as const

export const CREATE_STEPPER_CONNECTOR_STYLE = {
  activeColor: '#9558f6',
  completedColor: '#9558f6',
  disabledColor: '#e8e8ea',
  size: 1,
  stepSize: '2em',
  style: 'solid',
} as const
