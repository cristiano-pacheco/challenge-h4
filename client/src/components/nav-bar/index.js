import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Container, Image } from 'semantic-ui-react'

import logo from '../../assets/logo.svg'
import If from '../common/if'

const NavBar = ({ isAuthenticated }) => (
  <div>
    <Menu fixed='top' color='black' inverted>
      <Container>
        <Menu.Item as={Link} to='/'>
          <Image size='mini'src={logo} style={{ width: '100px' }} />
        </Menu.Item>
        <If test={isAuthenticated}>
          <Menu.Item as={Link} to='/users'>
          Users
          </Menu.Item>
        </If>
      </Container>
    </Menu>
  </div>
)

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(NavBar)
