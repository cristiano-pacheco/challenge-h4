import React, { Fragment } from 'react'
import { Header, Icon, Message } from 'semantic-ui-react'

const Home = () => (
  <Fragment>
    <Header as='h2' icon textAlign='center'>
      <Icon name='trophy' circular />
      <Header.Content>
        Client Side Challenge
      </Header.Content>
    </Header>
    <Message size='huge' style={{ textAlign: 'justify' }}>
      This client consume the API developed in the final challenge of the training Immersion in Development of APIS with
      the monster Erick Wendel.
    </Message>
  </Fragment>
)

export default Home
