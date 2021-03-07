import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import products from '../products';
import Product from '../components/Product';

const ProductScreen = () => {

    const { id } = useParams();
    const history = useHistory();


    return (
        <div>
           <p>I'm a product number {id}</p>
           <Product product={products[products.findIndex( product => product._id === id)]} />
           <button onClick={()=>history.go(-1)}>Go Back</button>
           {/* <Link to="" onClick={()=>history.go(-1)}>Go Back</Link> */}
        </div>
    )
}

export default ProductScreen
