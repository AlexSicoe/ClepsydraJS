import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { resetApp } from '../../actions/root-actions';
import { fetchUser } from '../../actions/user-actions';
import { getUsers } from '../../redux-orm/selectors';
import { basicStyle, borderStyle } from '../styles/styles';
import LoadingScreen from '../view/LoadingScreen';
import LogoutButton from '../view/LogoutButton';
import SimpleAppBar from '../view/SimpleAppBar';
import SimpleList from '../view/SimpleList';
import AddProjectButton from './AddProjectButton';



const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  authError: state.auth.error, //if this exists, reset app
  uid: state.auth.uid,
  users: getUsers(state),
})

const mapDispatchToProps = {
  fetchUser,
  logout: resetApp,
}


class HomeScreen extends Component<any, any> {
  componentWillMount() {
    const { uid, token, logout } = this.props
    if (!token) {
      logout()
    } else {
      this.props.fetchUser(uid, token)
    }
  }

  redirectToProject = (p: any) => {
    const { history } = this.props
    history.push(`/projects/${p.id}`)
  }

  render() {
    const { uid, users } = this.props
    const localUser = users.find((user: any) => user.id === uid)

    if (!localUser)
      return <LoadingScreen />

    return (
      <>
        <SimpleAppBar title="Home">
          <LogoutButton />
        </SimpleAppBar>

        Hello {localUser.username}!
          <br />
        <div style={{ ...basicStyle, ...borderStyle }}>

          {/* 
        //@ts-ignore */}
          <SimpleList
            items={localUser.projects}
            subheader="Project List"
            emptyMessage="You have no projects. Please create one"
            onItemClick={this.redirectToProject}
          />
        </div>

        <div style={basicStyle}>
          <AddProjectButton />
        </div>
        <br />
      </>
    )
  }
}

const HomeScreenWithRouter = withRouter(HomeScreen)
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenWithRouter)