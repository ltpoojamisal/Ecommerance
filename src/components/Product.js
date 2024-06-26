import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchCartProducts } from '../store/slice/UserSclice.js'
import { useDispatch, useSelector } from 'react-redux';
import { selectcustId ,selectCustomerObj} from '../store/slice/UserSclice.js';

import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
function Product() {
    const{categoryId}=useParams();
    const dispatch = useDispatch();
    const custObj = useSelector(selectCustomerObj);
    const custId=custObj.custId;

    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    // const [addtocart, setAddtoCart] = useState({
    //     "CustId": 0,
    //     "ProductId": 0,
    //     "Quantity": 0,
    // })

    /***********  Get Category Wise Data  */
 const[CatProduct,setCatProduct]=useState([]);
const getProductByCategoryId=async()=>{
const result=await axios.get("https://freeapi.gerasim.in/api/BigBasket/GetAllProductsByCategoryId?id="+categoryId)
if(result.data.data!=undefined)
    {
        setCatProduct(result.data.data);
    }    
}
useEffect(()=>{
    if(categoryId!=undefined)
        {
            getProductByCategoryId();
        }
   
},[categoryId])


    const handleAddToCart = async (product) => {
        if (isLoggedIn) {
            debugger;

            const addtocart = {

                custId: custId,
                productId: product,
                quantity:1,
                addedDate: new Date(),
            };
            try {

                const response = await axios.post("https://freeapi.gerasim.in/api/BigBasket/AddToCart", addtocart);
                if (response.data.result) {

                    dispatch(fetchCartProducts(custId));
                    toast.success('Item added to cart!');
                } else {
                    toast.warning('Item Alreday present ');
                }
            } catch (error) {

                toast.error('Failed to add item to cart.');
            }
        } else {

            toast.error('Please log in to add items to the cart.');
        }
    };
    useEffect(() => {
        if(custId!=undefined)
            {
                dispatch(fetchCartProducts(custId));
            }
       
    }, [dispatch, custId]);
    /************ Product List*********** */
    const [productlist, setProductList] = useState([]);

    const getProductList = async () => {
        const result = await axios.get("https://freeapi.gerasim.in/api/BigBasket/GetAllProducts");
        setProductList(result.data.data);
    }

    useEffect(() => {
        getProductList();
    }, []);


   

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
                {(categoryId !== undefined ? CatProduct : productlist).map(product => (
                        <div key={product.productSku} className="col-lg-3 col-md-4 col-sm-6 mb-5">
                            <div className="card" style={{ height: '100%' }}>
                                <img src={product.productImageUrl} className="card-img-top" alt={product.productName} style={{ height: '150px', objectFit: 'cover' }} />
                                <div className="card-body" style={{ height: '150px' }}>
                                    <h5 className="card-title">{product.productName}</h5>
                                    <p className="card-text">Price: {product.productPrice}</p>
                                    <button className='bg-success form-control text-white' onClick={() => handleAddToCart(product.productId)}><FontAwesomeIcon icon={faBagShopping} /> Add to cart</button>

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
