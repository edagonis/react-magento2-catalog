import React from 'react';
import { Link } from 'react-router-dom';

export default class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: undefined
        }
    }

    componentWillMount() {
        let sku = location.pathname.split('/')[2]

        // will fetch product if coming from direct url
        if (!this.props.location.product && sku) {
            let fetchUrl = '/catalogcomponent/?sku=' + sku;
            fetch(fetchUrl).then((res) => {
                return res.json();
            }).then((product) => {
                if (product) {
                    this.setState({ product })
                }
            })
        } else {
            this.setState({
                product: this.props.location.product
            })
        }
    }

    render() {
        return (
            <div>
                <Link to="/">back to catalog</Link>
                {!this.state.product ? (<p>loading product...</p>
                ) : (
                    <div>
                        <h2>{this.state.product.name}</h2>
                        <span>sku: {this.state.product.sku}</span>
                        <p><img width="145" src={'/pub/media/catalog/product' + this.state.product.imageUrl} /></p>
                        <p>price: <strong>${this.state.product.finalprice}</strong></p>
                    </div>
                )}
            </div>
        )
    }
}