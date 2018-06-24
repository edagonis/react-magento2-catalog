import React from 'react';
import { Link } from 'react-router-dom';

export default class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillMount() {
        console.log(this.props.location.product);
    }

    render() {
        return (
            <div>
                <Link to="/">back to catalog</Link>
            </div>
        )
    }
}