import * as React from 'react';
import {CreateUser} from '../components/pages/CreateUser';
import {UsersApi} from '../services/users';

class CreateUserLogic extends React.Component<any> {
  public state = {fetching: false, error: null};

  public onSubmit = async (values) => {
    this.setState({fetching: true, error: null});
    try {
      const data = await UsersApi.createOne(values);
      if (data.error) {
        return this.setState({error: data.error, fetching: false});
      }

      this.props.history.push('/panel/users');
    } catch (err) {
      this.setState({error: err, fetching: false});
    }
  }

  public render() {
    return (
      <CreateUser
        fetching={this.state.fetching}
        error={this.state.error}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export const CreateUserContainer = CreateUserLogic;
