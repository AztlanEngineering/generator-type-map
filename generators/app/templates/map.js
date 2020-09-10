/* <%= pkg %> <%= version %> */
import * as React from 'react'

import {
  MapObjectCard as Card,
  DotInfo
} from '@fwrlines/ds'

import QUERY_ALL from './graphql/all<%= plural %>.gql'
import QUERY_ONE from './graphql/get<%= name%>.gql'
//import QUERY_FULL from './graphql/get<%= name%>.full.gql'
//import QUERY_ONE_ASSOCIATIONS from './graphql/get<%= name %>.associations.gql'
import MUTATION_ADD from './graphql/add<%= name %>.gql'
import MUTATION_UPDATE from './graphql/update<%= name %>.gql'
import MUTATION_DELETE from './graphql/delete<%= name %>.gql'

export default {
  // This will display at the top. In the future we should include this as a menu title
  name        :'<%= plural %>',
  singular    :'<%= lower %>',
  plural      :'<%= lowerPlural %>',
  // This will be accessible from `URLS.MAP.${urlKey}`
  urlKey      :'<%= upper %>',
  // Used to catch the relevant urls in the mapper
  baseUrl     :'<%= lowerPlural %>',
  //orderField:'order',
  defaultViews:{
    table:{
      initialState:{
        hiddenColumns:[
          'fullId',
          'createdAt',
          'updatedAt'
        ]
      },
      columns:[
        {
          Header  :'id',
          accessor:'id'
        },
        {
          Header  :'fullId',
          accessor:'id',
          id      :'fullId',
          Cell    :(v) =>
            (<span className="f-mono">
              { v.value }
            </span>)
        },
        {
          Header  :'name',
          accessor:'name'
        },
        {
          Header  :'isActive',
          accessor:'isActive',
          sortType:'basic',
          Cell    :(v) => (<DotInfo
            boolean={v.value}
            trueClassName="y-warning"
            falseClassName="y-transparent"
          />)
        },
        {
          Header  :'createdAt',
          accessor:'createdAt',
          Cell    :(v) =>
            <Timestamp time={new Date(v.value)} />
        },
        {
          Header  :'updatedAt',
          accessor:'updatedAt',
          Cell    :(v) =>
            <Timestamp time={new Date(v.value)} />
            //<Timestamp time={ v.value }/>
        }
      ]

    },
    card:{
      Component:({ item, ...props }) => (
        <Card 
	item={item}
	{...props}
	>
          <Card.Section>
            <p className="h2">{ item.name }</p>
          </Card.Section>
          <Card.Section>
            <p>{ item.id }</p>
          </Card.Section>
          <Card.Section>
            <p>
This fruit tastes
              {' '}
              <strong>
                { item.taste }
              </strong>
            </p>
          </Card.Section>
        </Card>
      ),
      minWidth:'300px'
    },
    single:{
      fields:[
        {
          label   :'ID',
          name    :'id',
          inputId :'item-id',
          disabled:true
        },
        {
          label  :'name',
          name   :'name',
          inputId:'firstName'
        },
        {
          label   :'isActive',
          name    :'isActive',
          inputId :'isActive',
          type    :'checkbox',
          optional:true
        }
      ]

    }
  },
  
  /*
 actions:{
    extraActions:[
      {
        condition:(user) => true,
        Component:({ item }) =>
          item.url ? <a
            href={item.fullPath}
            target="_blank"
                     >
            <Button className="x-azure">Open</Button>
          </a> : null
      }
    ]
  },
 associations:{
   belongsTo:[
     {
       as        :'accessorForGraphQLObject',
       to        :'OtherModel.__typename',
       foreignKey:'columnKey'
     }
   ],
   hasMany:[
     {
       as        :'accessorForArrayOfGraphQLObjects',
       from      :'OtherModel.__typename',
       foreignKey:'columnKey in OtherModel'
     }
   ]

 },*/

  graphql:{
    queries:{
      ALL:QUERY_ALL,
      ONE :QUERY_ONE,
      //FULL:QUERY_FULL,
      //ONE_ASSOCIATIONS:QUERY_ONE_ASSOCIATIONS

    },
    mutations:{
      ADD   :MUTATION_ADD,
      DELETE:MUTATION_DELETE,
      UPDATE:MUTATION_UPDATE
    },
    types:{
      //onboardingStatus:Number
    }
  }
}
