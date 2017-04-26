import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { loginToFirebase } from '../firebase.js'

import techlaunchLogo from '../../../../assets/images/techlaunch-whitebg.png'

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
            console.log(user)
            this.toggleMenu()
        })
    }

    render() {
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
                    <Link onClick={this.toggleMenu} to={`/posts/new`} className="Menu-item">Create Post</Link>
                    <button onClick={this.login} className="Menu-item">Login</button>
                </div>
            </div>
        )
    }
}

export default Menu
