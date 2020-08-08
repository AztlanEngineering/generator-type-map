/* <%= pkg %> <%= version %> */
import * as React from 'react'
//import {} from 'react'
//import PropTypes from 'prop-types'

<% if (withquery) { %>
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'graphql-tag'
import QUERY from './graphql/<%= withquery %>.gql'
<% } %>

//Config
//import C from 'ui/cssClasses'


/**
 * Use `<%= name %>` to
 * Description :
 */
const <%= name %> = ({
}) => {
  <% if (withquery) { %>
  const {
    loading,
    error,
    data=
  } = useQuery(gql(QUERY))
  <% } %>
  
  return (
  <div
  >
    <h2>Welcome to the <%= name %> component</h2>
  </div>
)}

/*
<%= name %>.propTypes = {
}
*/

/*
<%= name %>.defaultProps = {
  status: 'neutral',
  //height:'2.2em',
  //as:'p',
}
*/
export default <%= name %>
