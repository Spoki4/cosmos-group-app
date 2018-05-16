import * as React from 'react'
import {Card, Icon} from 'antd';
import {ProcessSteps} from './ProcessSteps';

export const ProcessCard = ({process, loading, error, onEdit, onRemove}) => (
  <Card
    style={{width: '500px'}}
    cover={<div style={{padding: '16px 0 0 16px'}}><ProcessSteps process={{...process, steps: process.process}}
                                                                 size="default"/></div>}
    actions={[<Icon type="edit" onClick={() => onEdit(process.id)}/>,
      <Icon type="delete" onClick={() => onRemove(process.id)}/>]}
  >
    <Card.Meta title={process.product && process.product.name}/>
  </Card>
)