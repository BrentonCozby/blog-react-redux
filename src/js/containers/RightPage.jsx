import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toggleReadingMode } from 'actions/index.js'
import Footer from 'components/Footer.jsx'

class RightPage extends Component {

    render() {
        const { isReadingMode, toggleReadingMode } = this.props
        return (
            <div className={(isReadingMode) ? 'RightPage reading-mode' : 'RightPage'}>
                {isReadingMode &&
                    <div className="back-arrow" onClick={toggleReadingMode}>→</div>
                }
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isReadingMode: state.posts.isReadingMode
    }
}

export default connect(
    mapStateToProps,
    { toggleReadingMode }
)(RightPage)
