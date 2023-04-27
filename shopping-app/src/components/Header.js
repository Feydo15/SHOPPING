import React from "react";
import {
  Badge,
  Container,
  FormControl,
  Navbar,
  Nav,
  Dropdown,
  Button,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "./context/Context";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch
  } = CartState();

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping App</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a product"
            className="m-auto"
            onChange={(e) => productDispatch({type: "FILTER_BY_SEARCH", payload: e.target.value})}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown alignRight className="justify-content">
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu dropdown-menu-end" style={{ minWidth: 370 }}>
              {cart.length ? (
                <>
                  {cart.map((product) => (
                    <span className="cartItem" key={product.id}>
                      <img
                        src={product.image}
                        className="cartItemImg"
                        alt="product.name"
                      />
                      <div className="cartItemDetails">
                        <span>{product.name}</span>
                        <span>ZAR {product.price}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: product,
                          })
                        }
                      ></AiFillDelete>
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      {" "}
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
