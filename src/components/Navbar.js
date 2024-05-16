import { Link, useNavigate } from "react-router-dom";
import { fetchCartProducts } from '../store/slice/UserSclice.js'
import '../services/main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectcustId, selectIsLoggedIn, selectCartProducts, selectCustomerObj } from "../store/slice/UserSclice.js";
import { toast } from "react-toastify";
const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartProducts = useSelector(selectCartProducts)
    // const custId = useSelector(selectcustId);
    const loginIbj = useSelector(selectCustomerObj);
    const custId = loginIbj.custId;
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [categoryList, setCategoryList] = useState([]);
    const [registeModal, setRegisteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const[VshowModal,setVshowModal]=useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const loginobj = {
        userName: username,
        userPassword: password,
    }

    const [cusObj, setCustObj] = useState({
        "custId": 0,
        "name": "",
        "mobileNo": "",
        "password": ""
    })
    useEffect(() => {
        dispatch(fetchCartProducts(custId));
    }, [dispatch, custId]);
    const getCategoryList = async () => {
        try {
            const result = await axios.get("https://freeapi.gerasim.in/api/BigBasket/GetAllCategory");
            if (result.data.data !== undefined) {
                setCategoryList(result.data.data);
            }
        } catch (error) {
            console.error("Error fetching category list:", error);
            toast.error(error);
        }

    }

    /******** Delete Cart item */
    const deleteCart = async (product) => {
        debugger;
        const response = await axios.get("https://freeapi.gerasim.in/api/BigBasket/DeleteProductFromCartById?id=" + product.cartId);
        if (response.data.result) {
          //  alert("cart deleted");
            toast.success(response.data.message)
            dispatch(fetchCartProducts(custId));
        }
        else {

        }
    }


    /*********** Read Username and Password */
    const handleuserlogin = (e) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    /*********** Login ************* */
    const handleLogin = async () => {
        debugger;
        try {

            const result = await axios.post("https://freeapi.gerasim.in/api/BigBasket/Login", loginobj);
            if (result.data.result) {

                dispatch(login(result.data.data));
                dispatch(fetchCartProducts(result.data.data.custId));
                setShowModal(false);

            }
            else
            {
                toast.error("Type mobile no and password both.")
            }
        } catch (error) {
            console.log(error)
            alert("Invalid Mobile or password.");
            toast.error("Invalid mobile or password.")
        }

    };
    /********** Log out***********8 */
    const handleLogout = () => {
        navigate("/product")
        dispatch(logout());

    };
    useEffect(() => {
        getCategoryList();
    }, []);

    //**************  Handle Modal Login ************* */
    const showLoginModal = () => {
        setShowModal(true)
    }

    const closeModalLogin = () => {
        setShowModal(false);
    }
    /********** Check Out redirect*** */
    const showCheckout = () => {
        debugger

        navigate("/checkout");
    }
    /**************Handle Modal Register************* */
    const closeModalregister = () => {
        setRegisteModal(false);
    }
    /******** handle modal View Cart */
    const viewCart=()=>{
        setVshowModal(true);
    }
    const closeViewCart=()=>{
        setVshowModal(false)
    }

    const registerUser = (event, key) => {
        setCustObj(prev => ({ ...prev, [key]: event.target.value }));
    }

    const handleregister = async () => {
        try {
            const response = await axios.post("https://freeapi.gerasim.in/api/BigBasket/RegisterCustomer", cusObj);
            if (response.data.result) {
               // alert("Register Successfully");
                toast.success("Register Successfully")
                closeModalregister();
            }
            else {
                toast.error("Failed to register")

            }
        }
        catch (error) {
            alert(error)
        }

    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary fixed-top mynav pb-2 pt-2 mb-10">
                <div className="container">
                    <div className="navbar-brand align-self-baseline">
                        <FontAwesomeIcon icon={faCartShopping} className="me-2" /> Big Basket
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                        aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <div className="navbar-nav ms-auto mb-2 mb-lg-0 text-dark">
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                    {categoryList.map(category => (
                                        <li key={category.categoryId}>
                                            <Link className="dropdown-item" to={`/product/${category.categoryId}`}>{category.categoryName}</Link>
                                            {/* <Link className="dropdown-item">{category.categoryName}</Link> */}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {
                                isLoggedIn ? <div className="nav-item dropdown" >
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FontAwesomeIcon icon={faCartShopping} className="me-2" />{cartProducts.length}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                        {/* {(cartProducts && cartProducts.length > 0) && cartProducts.map(cartItem => (
                                            <li key={cartItem.productId}>
                                                <Link className="dropdown-item" to={'/'} >
                                                    {/* {cartItem.productName} - Quantity: {cartItem.quantity} */}
                                        {/* <div key={cartItem.productId} className="border-top d-flex mt-2 " style={{ width: "200px" }}>
                                                        <img className="img-fluid h-25 w-25 p-2" src={cartItem.productImageUrl} alt="" />
                                                        <div className="ps-3">
                                                            <p className="p-0 m-0 fw-semibold"><b>{cartItem.productName}</b></p>
                                                            <p className="p-0 m-0">Price: {cartItem.productPrice}</p>
                                                            <p className="text-start"><button className="btn">QTY : <b>{cartItem.quantity}</b> </button></p>
                                                            <Button onClick={() => { deleteCart(cartItem) }}> <FontAwesomeIcon icon={faTrash} className="sm-2" /></Button>

                                                        </div>
                                                    </div>

                                                </Link>
                                            </li>
                                        ))} */}
                                        {(cartProducts && cartProducts.length > 0) && cartProducts.map(cartItem => (
                                            <li key={cartItem.productId} className="p-2">
                                                <div className="d-flex border-bottom justify-content-between align-items-center">
                                                    <img className="image-fluid" src={cartItem.productImageUrl} alt="" style={{ width: '50px', height: '50px' }} />
                                                    <div>
                                                        <a href="#" className="text-decoration-none text-black fw-semibold">
                                                            <p className="m-0 p-0">{cartItem.productShortName}</p>
                                                        </a>
                                                        <p>{cartItem.quantity} * <i className="fa-solid fa-xmark" style={{ color: '#0d0d0d' }} ></i> ${cartItem.productPrice}</p>
                                                    </div>
                                                    <button type="button" className="btn fs-5 closeBtn" onClick={() => deleteCart(cartItem)}>
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                        {/* <Button className="btn btn-secondary form control" >View Cart</Button>
                                        <Button className="btn btn-success form control" onClick={() => { showCheckout() }}>Checkout</Button> */}
                                        <div className="d-flex justify-content-evenly mt-2">
                                            <button className="btn btn-dark rounded-0 px-3" onClick={viewCart}>View Cart</button>
                                            <button className="btn btn-danger rounded-0 px-3" ><a className="text-decoration-none text-black" href="#" onClick={() => { showCheckout() }}>Checkout</a></button>
                                        </div>
                                    </ul>
                                </div> : <div className="nav-item">
                                    <a className="nav-link " id="navbarDropdown" aria-expanded="false">
                                        <FontAwesomeIcon icon={faCartShopping} className="me-2" />
                                    </a>

                                </div>


                            }

                            {
                                isLoggedIn ? (<div className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FontAwesomeIcon icon={faUser} />  {loginIbj.name}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li >
                                            <Link className="dropdown-item" onClick={() => { handleLogout() }} to={'/'}>Logout</Link>
                                        </li>

                                    </ul>
                                </div>) : (<div className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FontAwesomeIcon icon={faUser} />
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li >
                                            <Link className="dropdown-item" onClick={() => { showLoginModal() }}>Login</Link>
                                        </li>
                                        <li >
                                            <Link className="dropdown-item" onClick={() => { setRegisteModal(true) }}>Register</Link>
                                        </li>
                                    </ul>
                                </div>)
                            }

                        </div>
                    </div>
                </div>
            </nav>
            <div className='mt-5'></div>
            <div className="row">
                <div className="col-12">
                    <Modal show={showModal} onHide={closeModalLogin}>
                        <Modal.Header closeButton className="bg-primary text-white">
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div>
                                    <div>
                                        <div className="row">

                                            <div className='col-12'>
                                                <label>Mobile No</label>
                                                <input type="text" className='form-control' onChange={(e) => { handleuserlogin(e) }} />

                                            </div>
                                        </div>
                                        <div className="row my-2">
                                            <div className="col-12">
                                                <label>Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    onChange={(e) => { handlePassword(e) }}
                                                />

                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <Button className="btn btn-primary form-control" onClick={handleLogin}>Login</Button>
                                            </div>
                                            <div className="col-6">
                                                <Button className="btn btn-secondary form-control">Reset</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Modal show={registeModal} onHide={closeModalregister}>
                        <Modal.Header closeButton className="bg-primary text-white">
                            <Modal.Title>Register</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div>
                                    <div>
                                        <div className="row">
                                            <div className='col-12'>
                                                <label> Name</label>
                                                <input type="text" className='form-control' onChange={(e) => { registerUser(e, 'name') }} />
                                            </div>

                                            <div className='col-12'>
                                                <label>Mobile No</label>
                                                <input type="text" className='form-control' onChange={(e) => { registerUser(e, 'mobileNo') }} />
                                            </div>
                                        </div>
                                        <div className="row my-2">
                                            <div className="col-12">
                                                <label>Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    onChange={(e) => { registerUser(e, 'password') }}
                                                />

                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <Button className="btn btn-primary form-control" onClick={handleregister}>Save</Button>
                                            </div>
                                            <div className="col-6">
                                                <Button className="btn btn-secondary form-control">Reset</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <Modal show={VshowModal} onHide={closeViewCart}>
                        <Modal.Header closeButton className="bg-primary text-white">
                            <Modal.Title>Carts Added</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div class="col-lg-12 col-md-6">
                                    <div class="card-body">


                                        {cartProducts.map((cartItem) => (
                                            <div key={cartItem.productId} className="border-top d-flex mt-2">
                                                <img className="img-fluid h-40 w-50 p-2" src={cartItem.productImageUrl} alt="" />
                                                <div className="ps-3">
                                                    <p className="p-0 m-0 fw-semibold"><b>{cartItem.productName}</b></p>
                                                    <p className="p-0 m-0">Price: {cartItem.productPrice}</p>
                                                    <p className="text-start mt-4"><button className="btn">QTY : <b>{cartItem.quantity}</b> </button></p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            
                        </Modal.Body>
                    </Modal>
                </div>
            </div>


        </>


    );
};

export default Navbar;
