import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { register } from '../../actions/auth/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Spinner from 'react-bootstrap/Spinner';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const registerHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await register({ name, email, password });
      toast.success('successfully registered');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col
          md={{ span: 4, offset: 4 }}
          className="mt-2 register_form text-center"
        >
          <div className="h3">Create account</div>
          <p className="text-muted">Lorem ipsum dolor sit amet.</p>
          <Form onSubmit={registerHandler} className="register_form_input">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
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
            <div className="register_btn">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading && (
                  <Spinner animation="border" className="spinner-custom" />
                )}
                Sign up
              </Button>
            </div>
            <p className="mt-3">
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

export default Register;
