import * as React from 'react';
import {Button, Col, Form, Radio, Row, Select, Spin} from 'antd';
import {FormItem} from '../../../components/FormItem';
import {Input} from '../../../components/Input';
import {Process} from '../reducer';
import RadioGroup from 'antd/es/radio/group';
import {ProcessSteps} from './ProcessSteps';

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
    return `Поставка от поставщика: ${process.supplier.name} на склад ${process.stockEnter.name}`
  } else if (step.stepType === 'processing') {
    return `Где то используется...`
  } else if (step.stepType === 'custom') {
    return step.name
  } else if (step.stepType === 'exit') {
    return `Отправка клиенту: ${process.stockExit.name} со склада ${process.stockExit.name}`
  }
}

class FormMarkup extends React.Component<any> {
  state = {
    count: '',
    process: [],
    productId: '',
    supplierId: '',
    clientId: '',
    stockEnterId: '',
    stockExitId: '',
    stepType: 'enter',
    message: ''
  }

  componentWillReceiveProps(nProps) {
    if (this.props.data !== nProps.data) {
      this.setState({...nProps.data})
    }
  }

  productChange = (value) => {
    this.setState({productId: value})
  }

  stockEnterChange = (value) => {
    this.setState({stockEnterId: value})
  }

  stockExitChange = (value) => {
    this.setState({stockExitId: value})
  }
  supplierChange = (value) => {
    this.setState({supplierId: value})
  }
  clientChange = (value) => {
    this.setState({clientId: value})
  }
  countChange = (name, value) => {
    this.setState({count: value})
  }

  changeProcessType = (e) => {
    this.setState({stepType: e.target.value})
  }

  changeCustomMessage = (name, value) => {
    this.setState({message: value})
  }

  renderProcessForm = () => {
    const {suppliers, clients, stocks} = this.props
    if (this.state.process.length !== 0 && this.state.process[this.state.process.length - 1].stepType === 'exit') {
      return <div>Нельзя добавлять в закрытый процесс</div>
    }
    if (this.state.stepType === 'enter') {
      if (this.state.process.length !== 0) {
        return <div>Нельзя добавлять прибытие в середину пути</div>
      }
      return (
        <Row style={{marginBottom: '16px'}}>
          <Col xs={10}>
            <span>Склад</span>
            <Select
              placeholder='Склад'
              value={this.state.stockEnterId}
              onChange={this.stockEnterChange}
            >
              {stocks && stocks.map(item => (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>))}
            </Select>
          </Col>
          <Col offset={4} xs={10}>
            <span>Поставщик</span>
            <Select
              placeholder='Поставщик'
              value={this.state.supplierId}
              onChange={this.supplierChange}
            >
              {suppliers && suppliers.map(item => (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>))}
            </Select>
          </Col>
        </Row>
      )
    } else if (this.state.stepType === 'exit') {
      return (
        <Row style={{marginBottom: '16px'}}><Col xs={10}>
          <span>Склад</span>
          <Select
            placeholder='Склад'
            value={this.state.stockExitId}
            onChange={this.stockExitChange}
          >
            {stocks && stocks.map(item => (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>))}
          </Select>
        </Col><Col offset={4} xs={10}>
          <span>Клиент</span>
          <Select
            placeholder='Клиент'
            value={this.state.clientId}
            onChange={this.clientChange}
          >
            {clients && clients.map(item => (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>))}
          </Select>
        </Col>
        </Row>
      )
    } else if (this.state.stepType === 'processing') {
      return (<div>Просто нажмите Добавить</div>)
    } else if (this.state.stepType === 'custom') {
      return (<FormItem
        label='Сообщение:'
      >
        <Input
          name='message'
          placeholder='Что-то нестандартное'
          value={this.state.message}
          onChange={this.changeCustomMessage}
        />
      </FormItem>)
    }
  }

  addProcessType = () => {
    this.setState({
      process: [...this.state.process, {stepType: this.state.stepType, name: this.state.message}],
      stepType: 'custom',
      message: ''
    })
  }
  clearProcess = () => {
    this.setState({
      process: [],
      stepType: 'custom',
      message: ''
    })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    const newState = {
      count: this.state.count,
      process: this.state.process,
      productId: this.state.productId,
      supplierId: this.state.supplierId,
      clientId: this.state.clientId,
      stockEnterId: this.state.stockEnterId,
      stockExitId: this.state.stockExitId,
    }

    this.props.onSubmit(newState)
  }

  render() {
    const {products} = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Spin spinning={this.props.fetching}>
          <FormItem
            label='Товар:'
          >
            <Select
              placeholder='Товар'
              value={this.state.productId}
              onChange={this.productChange}
            >
              {products && products.map(item => (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>))}
            </Select>
          </FormItem>
          <FormItem
            label='Количество:'
          >
            <Input
              name='count'
              placeholder='0'
              value={this.state.count}
              onChange={this.countChange}
            />
          </FormItem>
          <FormItem label="Этапы">
            <RadioGroup value={this.state.stepType} onChange={this.changeProcessType}>
              <Radio
                disabled={this.state.process.length !== 0 && this.state.process[this.state.process.length - 1].stepType === 'exit' || this.state.process.length !== 0}
                value={'enter'}>Поставка</Radio>
              <Radio
                disabled={this.state.process.length !== 0 && this.state.process[this.state.process.length - 1].stepType === 'exit' || this.state.process.findIndex(item => item.stepType === 'processing') !== -1}
                value={'processing'}>В процессе</Radio>
              <Radio
                disabled={this.state.process.length !== 0 && this.state.process[this.state.process.length - 1].stepType === 'exit'}
                value={'custom'}>Нестандартный шаг</Radio>
              <Radio
                disabled={this.state.process.length !== 0 && this.state.process[this.state.process.length - 1].stepType === 'exit'}
                value={'exit'}>Отправка</Radio>
            </RadioGroup>
            {this.renderProcessForm()}
            <ProcessSteps process={{
              ...this.state,
              steps: this.state.process,
              supplier: this.props.suppliers && this.props.suppliers.find(item => item.id === this.state.supplierId),
              stockEnter: this.props.stocks && this.props.stocks.find(item => item.id === this.state.stockEnterId),
              stockExit: this.props.stocks && this.props.stocks.find(item => item.id === this.state.stockExitId),
              client: this.props.clients && this.props.clients.find(item => item.id === this.state.clientId),

            }} size="default"/>
            <Row>
              <Col xs={12}>
                <Button type='primary' onClick={this.addProcessType} size='large'>
                  Добавить
                </Button>
              </Col>
              <Col xs={12}>
                <Button type='primary' onClick={this.clearProcess} size='large'>
                  Очистить процесс
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit' size='large'>
              Сохранить
            </Button>
          </FormItem>
        </Spin>
      </Form>
    )
  }
}

export const ProcessForm = FormMarkup
