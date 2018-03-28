import React, { Component } from 'react'
import { Segment, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class NavBar extends Component {

  state = { activeItem: 'missions' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted >
        <Menu inverted secondary >
          <Menu.Item as={Link} to='/missions' name='missions' active={activeItem === 'missions'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Item as={Link} to='/items' name='items' active={activeItem === 'items'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Item as={Link} to='/quizzes' name='quizzes' active={activeItem === 'quizzes'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Menu position='right' >
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick.bind(this)} />
          </Menu.Menu>
        </Menu>
      </Segment>
    )
  }
}

export default NavBar