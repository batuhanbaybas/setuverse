import { useRouterState } from '@tanstack/react-router'
import { Stepper } from 'react-form-stepper'

import { CREATE_FLOW_STEPS, getCreateFlowStepIndex } from '../lib/flow'
import {
  CREATE_STEPPER_CONNECTOR_STYLE,
  CREATE_STEPPER_STYLE,
} from '../lib/stepper-theme'

function CreateFlowStepper() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const activeStep = getCreateFlowStepIndex(pathname)

  return (
    <Stepper
      className="create-flow-stepper"
      steps={[...CREATE_FLOW_STEPS]}
      activeStep={activeStep}
      connectorStateColors
      styleConfig={CREATE_STEPPER_STYLE}
      connectorStyleConfig={CREATE_STEPPER_CONNECTOR_STYLE}
    />
  )
}

export default CreateFlowStepper
