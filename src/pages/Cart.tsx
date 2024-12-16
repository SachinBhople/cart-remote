import React from 'react'
import { Link } from 'react-router-dom'
import { useDeleteItemFromCartMutation, useEmptyCartMutation, useGetcartProductQuery } from '../redux/cartApi'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'



const Cart = () => {
    const { user } = useSelector<RootState, any>(state => state.auth)
    console.log(user._id);

    const { data } = useGetcartProductQuery(user && user._id)
    const [deleteproduct] = useDeleteItemFromCartMutation()
    const [emptycart] = useEmptyCartMutation()
    console.log(data);

    const subtotal = data
        ? data.result.reduce((total, item) => total + item.productId.price * item.quantity, 0)
        : 0;
    return <>

        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>Shopping Cart</h2>
                </div>
                <div>
                    <button onClick={() => emptycart(user && user._id)} className="btn btn-sm btn-danger">Empty Cart</button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-3">
                        {data && data.result.map(item => <div className="row g-0">
                            <div className="col-md-4">
                                <img height={100} src={item.productId.images} alt="Product" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Product Name: {item.productId.name}</h5>
                                    <p className="card-text"> Prdouct Price:{item.productId.price}</p>
                                    <div className="d-flex align-items-center">
                                        <label htmlFor="quantity" className="me-2">Qty:{item.quantity}</label>
                                        <input type="number" id="quantity" className="form-control w-25 me-3" value="1" min="1" />
                                        <button onClick={() => deleteproduct(item._id)} className="btn btn-danger btn-sm">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>

                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Order Summary</h5>
                            <p className="card-text">Subtotal: ${subtotal.toFixed(2)}</p>
                            <p className="card-text">
                                <strong>Total: ${(subtotal).toFixed(2)}</strong>
                            </p>
                            <Link to="/cart/checkout" className="btn btn-secondary w-100">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default Cart