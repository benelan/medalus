import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from "react-scroll";

const NavBar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div className="ui inverted vertical center aligned segment">
            <Navbar dark>
                {/* <img src={process.env.PUBLIC_URL + './cactus.png'} alt="logo" className="img-fluid" style={{ width: 50 }} /> */}
                <NavbarBrand className="mr-auto brand">Brought to You By Esri Support Services</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <p>We proactively prepare communities to identify environmentally sensitive areas and prime them for success using The Science of Where.</p>
                        <NavItem>
                            <NavLink style={{ color: 'white' }} href="https://github.com/benelan/medalus/">Github</NavLink>
                        </NavItem>
                        <NavItem>
                            <Link
                                to="viewDiv"
                                spy={true}
                                smooth={true}
                                duration={500}
                                style={{ cursor: 'pointer' }}
                            >Map</Link>
                        </NavItem>
                        <NavItem>
                            <Link
                                activeClass="active"
                                to="form"
                                spy={true}
                                smooth={true}
                                duration={500}
                                style={{ cursor: 'pointer' }}
                            >Form</Link>
                        </NavItem>
                        <NavItem>
                            <Link
                                activeClass="active"
                                to="about"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}
                                style={{ cursor: 'pointer' }}
                            >About</Link>
                        </NavItem>
                        <NavItem>
                            <Link
                                activeClass="active"
                                to="medalus"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}
                                style={{ cursor: 'pointer' }}
                            >MEDALUS Method</Link>
                        </NavItem>
                        <NavItem>
                            <Link
                                activeClass="active"
                                to="data"
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}
                                style={{ cursor: 'pointer' }}
                            >Data Setup</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <div className="ui text container">
                <h1 className="ui inverted header" style={{ font: '25px' }}>
                    MEDALUS
                </h1>
            </div>
        </div>
    );
};

export default NavBar;