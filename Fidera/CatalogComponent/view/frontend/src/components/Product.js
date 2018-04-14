import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => (
    <div>
        <Link to="/">back to catalog</Link>
        <h2>{props.location.product.name}</h2>
        <span>sku: {props.location.product.sku}</span>
        <p><img width="145" src={'/pub/media/catalog/product' + props.location.product.imageUrl} /></p>
        <p>price: <strong>${props.location.product.finalprice}</strong></p>
    </div>
);

export default Product;