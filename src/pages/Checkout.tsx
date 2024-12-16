import React, { useEffect } from 'react';
import { useEmptyCartMutation, useGetcartProductQuery, usePlaceOrderMutation } from '../redux/cartApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Checkout = () => {
    const { user } = useSelector<RootState, any>(state => state.auth)
    console.log(user._id, "dd");

    const { data } = useGetcartProductQuery(user && user._id)
    const [emptycart] = useEmptyCartMutation()
    const [placOrder, { isSuccess }] = usePlaceOrderMutation()
    const navigate = useNavigate()
    // console.log(data);

    const handlePlaceorder = () => {
        const products = data?.result.map(item => ({
            product: item.productId._id,
            qty: 1,
        }));
        if (products) {
            placOrder({ products, user: "668402180dfdb6358e94dc5c" })
        }
    }

    const subtotal = data
        ? data.result.reduce((total, item) => total + item.productId.price * item.quantity, 0)
        : 0;

    useEffect(() => {
        if (isSuccess) {
            emptycart(user && user._id)
            navigate("/cart/success")
        }
    }, [isSuccess])
    return (
        <>
            <div className="container my-5">
                <h2 className="mb-4">Order Summary</h2>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Order Details</h5>
                        <ul className="list-group list-group-flush">
                            {data && data.result.map(item => <li className="list-group-item d-flex justify-content-between">
                                <span>Product Name: {item.productId.name} </span>
                                <span>Price :{item.productId.price}</span>
                                {/* <span>Total :{item.productId.price + item.productId.price}</span> */}
                            </li>)}
                            <div className='text-end'> <strong>Total: ${(subtotal).toFixed(2)}</strong></div>
                        </ul>

                        {/* <div className="mt-4 text-end">
                            <h6> Payment </h6>
                            <div className="text-end ">
                                <input className="form-check-input mx-2" type="checkbox" value="" id="id" />
                                <label className="form-check-label" htmlFor="id">
                                    COD
                                </label>

                            </div>
                        </div> */}
                        <button onClick={handlePlaceorder} className="btn btn-primary w-100 mt-3">Place order</button>
                    </div>
                </div>


            </div>
        </>
    );
};

export default Checkout;
