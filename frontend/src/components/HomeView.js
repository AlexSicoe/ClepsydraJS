import React, { Component } from 'react'
import Theme from 'material-ui/styles/MuiThemeProvider';
import Button from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { getUsers } from '../redux-orm/selectors'
import { resetApp } from '../actions/root-actions'
import { ListView } from './ListView';

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
  users: getUsers(state)
})

const mapDispatchToProps = {
  onLogout: resetApp
}


class HomeView extends Component {
  componentWillMount() {

  }

  render() {
    let projects = [
      { id: 1, name: "p1" },
      { id: 2, name: "p2" },
    ]

    const { uid, users } = this.props
    const localUser = users.find(user => user.id === uid)



    if (localUser)
      console.log(localUser.projects)


    return (
      localUser ? //TODO, await fetching
        <Theme>
          <>
            Hello {localUser.username}!
          <br />
            <ListView items={localUser.projects} />
            <br />
            <Button
              label="Add Project"
              primary={true}
              style={style}
            // onClick={() =>
            //   this.props.onPostProject(uid, mockProject)
            //   } 
            />
            <br />
            <Button
              label="Log out"
              primary={true}
              style={style}
              onClick={() => this.props.onLogout()} />
          </>
        </Theme >
        : <></>
    )
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(HomeView)

const style = {
  margin: 15
}


