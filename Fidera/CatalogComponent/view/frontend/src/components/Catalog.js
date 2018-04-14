import React from 'react';
import { Link } from 'react-router-dom';

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentWillMount() {
        fetch('/catalogcomponent').then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({
                products: data
            })
        });
    }

    getProductState(sku) {
        return this.state.products.find((product) => product.sku == sku)
    }

    render() {
        return (
            <div>
                {
                    this.state.products.map((product) => (
                            <div key={product.sku}>
                                <Link to={{pathname: `/product/${product.sku}`, product: this.getProductState(product.sku)}}><h2>{product.name}</h2></Link>
                                <span>sku: {product.sku}</span>
                                <p><img width="145" src={'pub/media/catalog/product' + product.imageUrl} /></p>
                                <p>price: <strong>${product.finalprice}</strong></p>
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}