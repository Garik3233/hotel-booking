import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    window.localStorage.clear();
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" className="nav">
      <Container>
        <Link to="/" className="navbar_brand">
          HB
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto d-flex justify-content-end w-100 nav">
            <>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </>
            {auth && auth.token ? (
              <NavDropdown align="end" className="" title={auth.user.name}>
                <NavDropdown.Item as={Link} to="/dashboard/bookings">
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
