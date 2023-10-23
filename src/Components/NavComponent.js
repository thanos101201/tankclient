import React from 'react'
import { Nav, NavItem, NavLink, Navbar, NavbarBrand, Button } from 'reactstrap';
function NavComponent() {
  return (
    <Navbar>
        <NavbarBrand>
            <NavLink>
                Fish Tank
            </NavLink>
        </NavbarBrand>
        <NavItem>
            <Button>Log Out</Button>
        </NavItem>
    </Navbar>
  )
}

export default NavComponent