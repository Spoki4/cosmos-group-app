import * as React from "react"
import { connect } from "react-redux"
import { AppState } from "../../reducers"
import { getAllUsers } from "../selectors"
import { loadUsersList, removeUser } from "../actions"
import { UserList } from "../components/pages/UserList"

class UserListLogic extends React.Component<any> {
  componentDidMount() {
    this.props.loadUsers()
  }

  onRemove = (id: string) => {
    this.props.removeUser(id)
  }

  onCreate = () => {
    this.props.history.push(`${this.props.match.url}/create`)
  }

  render() {
    const { error, users, fetching } = this.props
    return (
      <UserList
        error={error}
        users={users}
        onCreate={this.onCreate}
        onRemove={this.onRemove}
        fetching={fetching}
      />
    )
  }
}

export const UserListContainer = connect(
  (state: AppState) => ({
    users: getAllUsers(state),
    fetching: state.users.fetching,
    error: state.users.error
  }),
  {
    loadUsers: loadUsersList,
    removeUser
  }
)(UserListLogic)
