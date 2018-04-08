import React from 'react';
import ReactDOM from 'react-dom';

const Component = () => (
    <div>
        <h1>This is the React Component under my Magento 2 module</h1>
    </div>
);

ReactDOM.render(<Component />, document.getElementById('app'));