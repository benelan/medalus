import React from 'react';
import NavBar from './NavBar';

const MainHeader = (props) => {
    return (
        <div className="pusher">
            <div className="ui inverted segment">
                <div className="ui inverted vertical masthead center aligned segment">
                <NavBar onClick={props.onClick} collapsed={props.collapsed}/>
                    <br />
                    <div className="ui text container" style={{padding: '20px'}}>
                        <h1 className="ui inverted header">
                            Medalus
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainHeader;