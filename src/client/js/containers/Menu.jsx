import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginToFirebase, logoutOfFirebase } from '../firebase.js'

import { rootUrl } from '../../../../config.js'
import techlaunchLogo from '../../../../assets/images/techlaunch-whitebg.png'
import { login, logout, clearActivePost } from '../actions/index.js'

class Menu extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    state = {
        isMenuVisible: false
    }

    toggleMenu = () => {
        this.setState({ isMenuVisible: !this.state.isMenuVisible })
    }

    login = () => {
        loginToFirebase()
        .then(user => {
            this.props.login(user)
        })
    }

    logout = () => {
        logoutOfFirebase()
        .then(() => {
            this.props.logout()
        })
    }

    onCreatePostClick = () => {
        this.props.clearActivePost()
        this.toggleMenu()
        this.context.router.history.push(rootUrl + '/posts/new')
    }

    render() {
        const { userId, name } = this.props
        return (
            <div>
                <div className={(this.state.isMenuVisible) ? 'menu-button close' : 'menu-button'} onClick={this.toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <div className={(this.state.isMenuVisible) ? 'Menu visible' : 'Menu'}>
                    <img src={techlaunchLogo} alt="Techlaunch Logo" className="Menu-logo"/>
                    <Link onClick={this.toggleMenu} to={`${rootUrl}/posts`} className="Menu-item">View All Posts</Link>
                    {userId &&
                        <a onClick={this.onCreatePostClick} className="Menu-item">Create Post</a>
                    }
                    {(userId)
                        ? <a onClick={this.logout} className="Menu-item">Logout</a>
                        : <a onClick={this.login} className="Menu-item">Admin Login</a>
                    }
                    {userId &&
                        <p className="Menu-name">Logged in as {name}</p>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.id,
        name: state.user.name
    }
}

export default connect(
    mapStateToProps,
    {
        login,
        logout,
        clearActivePost
    }
)(Menu)
