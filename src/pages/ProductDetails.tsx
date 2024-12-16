import React from 'react';
import { useAddtoCartMutation } from '../redux/cartApi';
import { useParams } from 'react-router-dom';
import { useGetproductDeailtsQuery } from '../redux/pubilicApi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ProductDetails = () => {
    const { id } = useParams()
    const { user } = useSelector<RootState, any>(state => state.auth)
    const { data } = useGetproductDeailtsQuery(id);
    console.log(data);
    const [addtocart] = useAddtoCartMutation()
    const hadleaddtocart = (product: any) => {
        addtocart({ pId: product._id, uId: user && user._id })
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const product = data.result;

    return (
        <>
            <h1>Product Details</h1>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={product.images}
                            alt={product.name}
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2>{product.name}</h2>
                        <p>{product.desc}</p>
                        <h4>Price: ₹{product.price}</h4>
                        <p><strong>MRP: ₹{product.mrp}</strong></p>
                        <p>Stock: {product.stock} items available</p>
                        <button onClick={() => hadleaddtocart(product)} className="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
