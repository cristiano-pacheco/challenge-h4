import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const NotFound = () => (
  <div>
    <Header as='h2' icon textAlign='center'>
      <Icon name='dont' circular />
      <Header.Content>
        404 Not Found!
      </Header.Content>
    </Header>
  </div>
)

export default NotFound
