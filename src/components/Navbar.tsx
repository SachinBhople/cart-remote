import React from 'react'
import { Link } from 'react-router-dom'
import { useGetAllproductsQuery } from '../redux/cartApi'

const Navbar = () => {
    const { data } = useGetAllproductsQuery("668402180dfdb6358e94dc5c")
    console.log(data && data.result);

    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                <a className="navbar-brand" href="#">ShopEasy</a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link to="/product" className="nav-link active" >Product details</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/pro">Product</Link>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to='cart'>
                                <i className="bi bi-cart"></i> Cart <span className="badge bg-primary">{data && data.result.length}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </>
}

export default Navbar