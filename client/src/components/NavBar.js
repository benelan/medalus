import React from 'react';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link, animateScroll as scroll } from "react-scroll";

const NavBar = (props) => {
    return (
        <div className="ui inverted segment">
            <Navbar dark>
                <NavbarBrand className="mr-auto" onclick={scroll.scrollToTop()}>Brought to You By the Esri Support Services SDK and Enteprise Team</NavbarBrand>
                <NavbarToggler onClick={props.onClick} className="mr-2" />
                <Collapse isOpen={!props.collapsed} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="https://github.com/benelan/medalus/tree/master/client">Github</NavLink>
                    </NavItem>
                    <NavItem>
                    <Link
                        activeClass="active"
                        to="form"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >Form</Link>
                    </NavItem>
                    <NavItem>
                    <Link
                        activeClass="active"
                        to="about"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >About</Link>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;