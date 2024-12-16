import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllproductQuery } from '../redux/pubilicApi';
// import { useLoginMutation } from 'auth/authApi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Product = () => {
    const { data } = useGetAllproductQuery();
    const { user } = useSelector<RootState, any>(state => state.auth)
    console.log(user);

    return (
        <>
            <div className="row">
                {data && data.result.map((product: any) => (
                    <div key={product._id} className="col-md-4 mb-4">
                        <div className="card" style={{ width: '18rem' }}>

                            <img
                                src={product.images}
                                className="card-img-top"
                                alt={product.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.desc}</p>
                                <p className="card-text">Price: ${product.price}</p>

                                <p className="card-text">MRP: ${product.mrp}</p>
                                <p className="card-text">Stock: {product.stock}</p>
                                <Link to={`/cart/product/${product._id}`} className="btn btn-primary">View Product</Link>
                            </div>
                        </div >
                    </div >
                ))}
            </div >

        </>
    );
}

export default Product;
