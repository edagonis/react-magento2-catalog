import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';

const Component = () => (
    <div>
        <AppRouter />
    </div>
);

ReactDOM.render(<Component />, document.getElementById('app'));