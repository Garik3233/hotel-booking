import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Search from './../Search';
import './HomeBanner.css';

const HomeBanner = () => {
  return (
    <div className="home-banner">
      <Container>
        <Row>
          <div className="banner_text">
            <p>Book your Relax</p>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default HomeBanner;
