import * as React from 'react'
import {Steps} from 'antd';
import {Process} from '../reducer';

const getStepTitleByType = (type) => {
  if (type === 'enter') {
    return 'Поставка'
  } else if (type.stepType === 'processing') {
    return `Где то используется...`
  } else if (type.stepType === 'custom') {
    return 'Нестандартный шаг'
  } else if (type === 'exit') {
    return 'Отправка'
  }
}

const getStepDescriptionByType = (step, process: Process) => {
  if (step.stepType === 'enter') {
    return `Поставка от поставщика: ${process.supplier && process.supplier.name} на склад ${process.stockEnter && process.stockEnter.name}`
  } else if (step.stepType === 'processing') {
    return `Где то используется...`
  } else if (step.stepType === 'custom') {
    return step.name
  } else if (step.stepType === 'exit') {
    return `Отправка клиенту: ${process.client && process.client.name} со склада ${process.stockExit && process.stockExit.name}`
  }
}

export const ProcessSteps = ({process, size}) => (
  <Steps direction="vertical" size={size}>
    {process.steps.map((step, index) => (
      <Steps.Step key={index} status="finish" title={getStepTitleByType(step.stepType)}
                  description={getStepDescriptionByType(step, process)}/>
    ))}
  </Steps>
)
