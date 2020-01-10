import React from 'react';
import Menu from './Menu';

const MainHeader = () => {
    return (
        <div className="pusher">
            <div className="ui inverted segment">
                <div className="ui inverted vertical masthead center aligned segment">
                    <Menu />
                    <br />
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