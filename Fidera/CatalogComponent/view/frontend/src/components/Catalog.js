import React from 'react';
import { Link } from 'react-router-dom';

export default class Catalog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [{
                id: 1,
                name: 'T-shirt',
                price: 20.00,
                image: 'https://images-na.ssl-images-amazon.com/images/I/616kNATei3L._UX425_.jpg'
            },
            {
                id: 2,
                name: 'Leggings',
                price: 35.00,
                image: 'https://images-na.ssl-images-amazon.com/images/I/616kNATei3L._UX425_.jpg'
            }]
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.products.map((product) => (
                            <div key={product.id}>
                                <Link to={`/product/${product.id}`}>{product.name}</Link>
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}