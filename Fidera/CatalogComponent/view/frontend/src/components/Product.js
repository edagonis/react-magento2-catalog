import React, {Fragment} from 'react';
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
                    this.setState({ product });
                }
            })
        } else {
            this.setState({
                product: this.props.location.product
            })
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        let data = new FormData(e.target);
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
                        <form onSubmit={this.onFormSubmit} data-role="tocart-form" action={this.state.product.addToCartUrl} method="post"> 
                            <input name="form_key" type="hidden" value={this.state.product.formKey} />
                            <input type="hidden" name="product" value="1" />
                            <div className="btn">
                                <button type="submit" title="Add to Cart" className="action tocart primary">
                                    <span>Add to Cart</span>
                                </button>
                            </div>   
                        </form>
                    </div>
                )}
            </div>
        )
    }
}