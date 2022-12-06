import { login } from '../../actions/auth/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
// Bootstrap
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await login({ email, password });
      setTimeout(() => {
        navigate('/dashboard/bookings');
      }, 1000);
      if (response.data) {
        window.localStorage.setItem('auth', JSON.stringify(response.data));
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: response.data,
        });
      }
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }} className="mt-4">
          <div className="h3">Welcome</div>
          <p className="text-muted">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
          <Form onSubmit={loginHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading && (
                <Spinner animation="border" className="spinner-custom" />
              )}
              Sign in
            </Button>
            <p className="mt-4">
              <small className="text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas, ducimus?
              </small>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
