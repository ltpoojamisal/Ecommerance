import { Link } from "react-router-dom";
import '../services/main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping ,faUser} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
    const [categoryList, setCategoryList] = useState([]);

    const getCategoryList = async () => {
        try {
            const result = await axios.get("https://freeapi.gerasim.in/api/BigBasket/GetAllCategory");
            if (result.data.data !== undefined) {
                setCategoryList(result.data.data);
            }
        } catch (error) {
            console.error("Error fetching category list:", error);
        }
    }

    useEffect(() => {
        getCategoryList();
    }, []);

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
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                {categoryList.map(category => (
                                    <li key={category.id}>
                                        <Link className="dropdown-item" to={`/category/${category.categoryId}`}>{category.categoryName}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link className="nav-link" to="/user"><FontAwesomeIcon icon={faUser} /></Link>
                    </div>
                </div>
            </div>
        </nav>
        <div className='mt-5'></div>
        
        </>
       
        
    );
};

export default Navbar;
