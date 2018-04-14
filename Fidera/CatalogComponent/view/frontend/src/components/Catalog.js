import React from 'react';
import { Link } from 'react-router-dom';

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        console.log('mounted');
        fetch('/catalogcomponent').then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({
                products: data
            })
        });
    }

    handleProductState(sku) {
        return this.state.products.filter((product) => {
            return product.sku == sku && product;
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.products.map((product) => (
                            console.log(product),
                            <div key={product.sku}>
                                <Link to={{pathname: `/product/${product.sku}`, product: this.handleProductState(product.sku)}}>{product.name}</Link>
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}