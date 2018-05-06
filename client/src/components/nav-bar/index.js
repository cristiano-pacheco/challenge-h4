import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Container, Image } from 'semantic-ui-react'

import logo from '../../assets/logo.svg'

const NavBar = () => (
  <div>
    <Menu fixed='top' color='black' inverted>
      <Container>
        <Menu.Item as={Link} to='/'>
          <Image size='mini'src={logo} style={{ width: '100px' }} />
        </Menu.Item>
      </Container>
    </Menu>
  </div>
)

export default NavBar
