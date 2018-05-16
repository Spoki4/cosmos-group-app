import * as React from 'react';
import {connect} from 'react-redux';
import {getAllProcesses, getProcessStateBranch} from '../selectors';
import {AppState} from '../../reducers';
import {loadAllProcesses, removeProcess} from '../actions';
import {ProcessList} from '../components/ProcessList';

class ProcessListLogic extends React.Component<any> {
  componentDidMount() {
    this.props.load()
  }

  onCreate = () =>
    this.props.history.push(`${this.props.match.url}/create`)

  onEdit = (id) =>
    this.props.history.push(`${this.props.match.url}/edit/${id}`)

  onRemove = (id) =>
    this.props.remove(id)

  render() {
    return (
      <ProcessList
        processes={this.props.processes}
        loading={this.props.loading}
        error={this.props.error}
        onCreate={this.onCreate}
        onEdit={this.onEdit}
        onRemove={this.onRemove}
      />
    )
  }
}

export const ProcessListContainer = connect(
  (state: AppState) => ({
    processes: getAllProcesses(state),
    loading: getProcessStateBranch(state).fetching,
    error: getProcessStateBranch(state).error
  }),
  {
    load: loadAllProcesses,
    remove: removeProcess
  }
)(ProcessListLogic)
