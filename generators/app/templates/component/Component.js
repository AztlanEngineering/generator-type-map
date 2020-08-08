/* <%= pkg %> <%= version %> */
import * as React from 'react'
//import {} from 'react'
import PropTypes from 'prop-types'

<% if (withquery) { %>
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import QUERY from './graphql/<%= withquery %>.gql'
<% } %>


//Intl

//import { FormattedMessage} from "react-intl";
//import messages from "./messages";
// <FormattedMessage {...messages.title} />

//Config

//import C from 'ui/cssClasses'

//Relative imports
//import styles from './<%= scss %>'
import { isBackend } from 'ui/isBackend'

if(!isBackend) {
  import('./<%= scss %>')
}

const baseClassName = '<%= lower %>'


/**
 * Use `<%= name %>` to
 * Has color `x` 
 */
const <%= name %> = ({
  id,
  className,
  style
}) => {
  <% if (withquery) { %>
  const {
    loading,
    error,
    data={}
  } = useQuery(gql(QUERY))
  <% } %>
  
  return (
  <div 
    className={
      [
        //styles[baseClassName],
        baseClassName,
        className
      ].filter(e => e).join(' ')
  }
    id={ id }
    style={ style }
  >
    <h2>Welcome to the <%= name %> component</h2>
  </div>
)}

<%= name %>.propTypes = {
  /**
   * Provide an HTML id to this element
   */
  id: PropTypes.string,

  /**
   * The html class names to be provided to this element
   */
  className: PropTypes.string,

  /**
   * The JSX-Written, css styles to apply to the element.
   */
  style: PropTypes.object,

  /**
   *  The children JSX
   */
  children: PropTypes.node,

  /**
   * Which html tag to use
   */
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]), 
  //as: PropTypes.string,

  /**
   * The height of the element
   */
  height: PropTypes.string,

  /**
   * The width of the element
   */
  width: PropTypes.string,
  /*
  : PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
  : PropTypes.func,
  : PropTypes.func,
  : PropTypes.oneOf(['', ''])
  */
}

/*
<%= name %>.defaultProps = {
  status: 'neutral',
  //height:'2.2em',
  //as:'p',
}
*/
export default <%= name %>
