import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginToFirebase, logoutOfFirebase } from '../firebase.js'

import techlaunchLogo from '../../../../assets/images/techlaunch-whitebg.png'
import { login, logout } from '../actions/index.js'

class Menu extends Component {

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

    render() {
        const { id, name } = this.props
        return (
            <div>
                <div className={(this.state.isMenuVisible) ? 'menu-button close' : 'menu-button'} onClick={this.toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <div className={(this.state.isMenuVisible) ? 'Menu visible' : 'Menu'}>
                    <img src={techlaunchLogo} alt="Techlaunch Logo" className="Menu-logo"/>
                    <Link onClick={this.toggleMenu} to={`/posts`} className="Menu-item">All Posts</Link>
                    {id &&
                        <Link onClick={this.toggleMenu} to={`/posts/new`} className="Menu-item">Create Post</Link>
                    }
                    {(id)
                        ? <a onClick={this.logout} className="Menu-item">Logout</a>
                        : <a onClick={this.login} className="Menu-item">Login</a>
                    }
                    {id &&
                        <p className="Menu-name">Logged in as {name}</p>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.user.id,
        name: state.user.name
    }
}

export default connect(
    mapStateToProps,
    {
        login,
        logout
    }
)(Menu)
