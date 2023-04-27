import {
  Image,
  Form,
  Col,
  Row,
  ListGroup,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { CartState } from "../components/context/Context";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";

const Cart = (id) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  
  const [total, setTotal] = useState(Number);

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.products), 0));
  }, [cart]);

console.log("total", total);
  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((product) => (
            <ListGroupItem key={product.id}>
              <Row>
                <Col md={2}>
                  <Image src={product.image} alt={product.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{product.name}</span>
                </Col>
                <Col md={2}>ZAR {product.price}</Col>
                <Col md={2}>
                  <Rating rating={product.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={product.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: product.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(product.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: product,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total: ZAR {total}
        </span>
        <Button type="button" disabled={cart.length === 0}>
          {" "}
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
