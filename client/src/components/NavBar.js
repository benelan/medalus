import React from 'react';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = (props) => {
    return (
        <div className="ui inverted segment">
            <Navbar dark>
                <NavbarBrand className="mr-auto">Brought to You By the Esri Support Services SDK and Enteprise Team</NavbarBrand>
                <NavbarToggler onClick={props.onClick} className="mr-2" />
                <Collapse isOpen={!props.collapsed} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="https://github.com/benelan/medalus/tree/master/client">Github</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/">About</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;