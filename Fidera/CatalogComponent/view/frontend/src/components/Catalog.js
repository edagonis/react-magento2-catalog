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
        return this.state.products.filter((product) => product.sku == sku && product)
    }

    render() {
        return (
            <div>
                {
                    this.state.products.map((product) => (
                            <div key={product.sku}>
                                <Link to={{pathname: `/product/${product.sku}`, product: this.getProductState(product.sku)}}>{product.name}</Link>
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}