import React, { Component } from 'react'
import SimpleList from '../view/SimpleList'
import AddUserButton from './AddMemberButton'
import { Button, ListItem, ListItemText } from '@material-ui/core'
import { toJS } from 'mobx'
import { IUser } from '../../stores/model-interfaces'

interface IProps {
  users: IUser[]
}

interface IState {
  // TODO
}

export default class MemberList extends Component<IProps, IState> {
  handleItemClick = (u: any) => {
    console.log(toJS<IUser>(u))
  }

  handleItemView = (onItemClick: any, u: IUser) => {
    return (
      <ListItem divider button key={u.id} onClick={() => onItemClick(u)}>
        <ListItemText primary={u.name} />
        <ListItemText secondary={u.email} />
        <ListItemText secondary={u.members!.role} />
      </ListItem>
    )
  }
  render() {
    const { users } = this.props

    return (
      <div>
        <SimpleList
          items={users}
          subheader="Users"
          emptyMessage="No users"
          onItemClick={this.handleItemClick}
          onItemView={this.handleItemView}
        />
        <AddUserButton />
        <Button
          color="primary"
          variant="contained"
          onClick={() => console.log('remove user mock')}
        >
          Remove User
        </Button>
      </div>
    )
  }
}
