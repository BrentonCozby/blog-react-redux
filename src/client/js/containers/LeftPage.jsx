import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import techlaunchLogo from '../../../../assets/images/techlaunch-blackbg.png'
import defaultPhoto from '../../../../assets/images/defaultPhoto.jpg'
import xButton from '../../../../assets/images/x.png'

import { rootUrl } from '../../../../config.js'
import { toggleReadingMode } from '../actions/index.js'

const setPhoto = (url) => ({
    backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, .8) 100%),
        linear-gradient(rgba(0, 0, 0, .7) 0%, rgba(0, 0, 0, 0) 30%),
        url(${url})
    `
})

class LeftPage extends Component {

    render() {
        const { headingText, photoUrl, date, isReadingMode, toggleReadingMode } = this.props
        return (
            <section
                className={(isReadingMode) ? 'LeftPage reading-mode' : 'LeftPage'}
                style={setPhoto(photoUrl || defaultPhoto)}
            >
                <div className="top">
                    <Link to={rootUrl}><img src={techlaunchLogo} alt="Techlaunch logo" className="logo"/></Link>
                    <div className="close" onClick={toggleReadingMode}>
                        <img src={xButton} alt="go to reading mode"/>
                        <p>reading mode</p>
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="heading">{headingText}</h1>
                    {date && <p className="date">{date}</p>}
                    <div className="social-media-links">
                        <a target="_blank" rel="noopener" href="http://www.facebook.com/FVITech/">
                            <i className="fa fa-facebook-square" aria-hidden="true"></i>
                        </a>
                        <a target="_blank" rel="noopener" href="http://twitter.com/fvitech">
                            <i className="fa fa-twitter-square" aria-hidden="true"></i>
                        </a>
                        <a target="_blank" rel="noopener" href="http://plus.google.com/u/1/b/105289039757508765516/105289039757508765516">
                            <i className="fa fa-google-plus-square" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state,
        headingText: state.leftPage.headingText,
        photoUrl: state.leftPage.photoUrl,
        date: state.leftPage.date,
        isReadingMode: state.posts.isReadingMode
    }
}

export default connect(mapStateToProps, { toggleReadingMode })(LeftPage)
