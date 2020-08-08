/* <%= pkg %> <%= version %> */
import * as React from 'react'
//import {} from 'react'
import PropTypes from 'prop-types'

import { Page, Heading } from '@fwrlines/ds'

import { LocalNavBar, LocalFooter } from 'app/common/components'

<% if (withquery) { %>
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'graphql-tag'
import QUERY from './graphql/<%= withquery %>.gql'
<% } %>

//Config
//import C from 'ui/cssClasses'

//Intl

//import { FormattedMessage} from "react-intl";
//import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
//import messages from "./messages";
// <FormattedMessage {...messages.title} />
// <FormattedHTMLMessage {...messages.title} tagName='p'/>

//const baseClassName = 'page_<%= lower %>'
const baseId = 'page_<%= lower %>'

const helmet = {
  robots             :'noindex, nofollow',
  title              :'test of the title',
  title_tag           :'hello',
  //title_tag          :<FormattedMessage {...messages.title} />,
  /*
  canonical          :'https://home.com/description',
  meta_description   :'This is the meta description. 170 chars.',
  twitter_title      :'For twitter, a title',
  twitter_description:'',
  twitter_image      :'',
  og_title           :'This is the open graph title',
  og_description     :'',
  og_image           :'',
  og_type            :'',
  og_url             :'',
  */
}

const content = {
  sectionTitle:{
    sectionProps:{
      id:'title',
      head:true,
      className:''
    },
    headingProps:{
      //id,
      className:'uc',
      //style,
      //children, //appended at bottom

      //heading         :'hello',
      heading         :<FormattedMessage {...messages.title} />,
      //headingClassName:'ts-green',
      headingAs       :'h1',
      //headingProps :{}

      label:'film',
      //label         :<FormattedMessage {...messages.label} />,
      labelClassName  :'x-red basic',
      //labelAs:'p',
      //labelProps :{},
      //
      //subtitle        :'Stanley Kubrick, 1960',
      subtitle         :<FormattedMessage {...messages.subtitle} />,
      //subtitleClassName,
      //subtitleProps:{},

    }
  }
}


/**
 * Page `<%= name %>`
 * Description : 
 */
const <%= name %> = ({
  history,
  location,
  match
}) => {
  <% if (withquery) { %>
  const {
    loading,
    error,
    data=
  } = useQuery(gql(QUERY))
  <% } %>
  
  return (
    <Page id={ baseId }
      //itemType='https://schema.org/FAQPage'
      className='u2'
      HELMET={ helmet }
    >
      <LocalNavBar/>
      <Page.Section
        { ...content.sectionTitle.sectionProps }
      >
    
        <Heading { ...content.sectionTitle.headingProps } />
      </Page.Section>
      <Page.Section
        { ...content.sectionTitle.sectionProps }
      >
    
        <Heading { ...content.sectionTitle.headingProps } />
      </Page.Section>
      <Page.Section
        { ...content.sectionTitle.sectionProps }
      >
    
        <Heading { ...content.sectionTitle.headingProps } />
      </Page.Section>

    </Page>
)}

<%= name %>.propTypes = {
  /**
   * 
   */
  someprop: PropTypes.node,

  /*
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]), 
  : PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
  children: PropTypes.node,
  : PropTypes.func,
  styles: PropTypes.object,
  : PropTypes.oneOf(['', ''])
  */
}

/*
<%= name %>.defaultProps = { 
  status: 'neutral',
}
*/


export default <%= name %>
