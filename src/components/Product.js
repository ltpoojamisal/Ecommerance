import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Product() {
    const [productlist, setProductList] = useState([]);

    const getProductList = async () => {
        const result = await axios.get("https://freeapi.gerasim.in/api/BigBasket/GetAllProducts");
        setProductList(result.data.data);
    }

    useEffect(() => {
        getProductList();
    }, []); // Empty dependency array to ensure useEffect runs only once

    return (
        <>
            <div className='mt-5'></div>
            <div className="container mt-5">
                <div className='row mt-5'>
                    <h1 className='text-primary text-center'>Bestseller Products</h1>
                    <p className='text-center'>Discover our handpicked selection of top-rated products. From must-have essentials to trendy favorites, find what you need to elevate your lifestyle.

</p>
                </div>
                <div className="row mt-5">
                    {productlist.map(product => (
                        <div key={product.productSku} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div className="card" style={{ height: '100%' }}>
                                <img src={product.productImageUrl} className="card-img-top" alt={product.productName} style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body" style={{ height: '150px' }}>
                                    <h5 className="card-title">{product.productName}</h5>
                                    <p className="card-text">Price: {product.productPrice}</p>
                                
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Product;
