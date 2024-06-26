import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify'; //display toast notifications in React applications. Toast notifications are small, non-blocking messages that appear temporarily on the screen
// import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAdressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScrenn';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signOutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        {/* <ToastContainer position="bottom-center" limit={1} /> */}
        <header>
          <Navbar bg="dark" varient="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="amazona-brand">Amazona</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link" bg="warning">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      {/* reduce is an array method that processes each element in the array and reduces it to a single cumulative value */}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown titile={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order Historya</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider>
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signOutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown.Divider>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              {/* <Route path="product/:slug" element={<ProductScreen />} /> */}
              <Route path="/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />}></Route>
              <Route path="/signin" element={<SigninScreen />}></Route>
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              {/* <Route path="/order" element={<OrderScreen />} /> */}
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>

        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
