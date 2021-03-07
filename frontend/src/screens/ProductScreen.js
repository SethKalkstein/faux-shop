import React from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import products from '../products';
import Rating from '../components/Rating'
// import Product from '../components/Product';

const ProductScreen = ({match}) => {

    const { id } = useParams();
    const paramId = match.params.id; //this and the statement above do the same thing
    const history = useHistory();
    const product = products.find( p => p._id === paramId); 

    return (
        <>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='bg-light text-dark'>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item  className='bg-light text-dark' >
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item  className='bg-light text-dark' >
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item  className='bg-light text-dark' >
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                   <Card>
                       <ListGroup variant='flush'>
                           <ListGroup.Item   className='bg-light text-primary' >
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                           </ListGroup.Item>
                           <ListGroup.Item   className='bg-light text-dark' >
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                           </ListGroup.Item>
                           <ListGroup.Item className='bg-light'>
                               <Button block disabled={product.countInStock === 0}>
                                   Add To Cart
                               </Button>
                           </ListGroup.Item>
                       </ListGroup>
                    </Card> 
                </Col>
            </Row>

            <button className='btn btn-secondary m-3 btn-outline-primary' variant='primary' onClick={()=>history.go(-1)}>Go Back</button>
            <Link className='btn btn-primary m-3 btn-outline-secondary' to='home'>Go Home</Link>

            <p><sub className='text-muted'>
                <span className='m-3'>My parameter is {id} </span>
                <span>My array index is: {products.findIndex( prod => prod._id === id)}</span>
            </sub></p>
           {/* <Link to="" onClick={()=>history.go(-1)}>Go Back</Link> */}
        </>
    )
}

export default ProductScreen
