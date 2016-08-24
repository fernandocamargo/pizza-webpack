import merge from 'lodash/merge'
import omit from 'lodash/omit'
import React from 'react'
import classnames from 'classnames'

export default (props) => {
  const {message = 'Loading...'} = props
  const className = classnames({
    paragraph: true,
    loading: true
  })
  const children = message
  return <p {...merge({}, omit(props, 'message'), {className, children})} />
}
