import React from 'react';
import NavBar from './NavBar';

const MainHeader = (props) => {
    return (
        <div className="ui inverted vertical masthead center aligned segment">
            <NavBar onClick={props.onClick} collapsed={props.collapsed} />
        </div>
    );
}

export default MainHeader;