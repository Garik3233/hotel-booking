import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { allHotels } from '../actions/hotels';
import { Link } from 'react-router-dom';
import HotelCard from '../components/cards/HotelCard';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Hotels = () => {
  const [hotels, setHotels] = useState('');
  const [page, setPage] = useState(8);

  const styleBtn = {
    width: '15%',
    marginBottom: '40px',
  };

  const getAllHotels = async () => {
    try {
      const res = await allHotels();
      if (res.data) {
        setHotels(res.data);
      }
    } catch (err) {
      toast.error('Err');
    }
  };

  const loadHotel = () => {
    setPage((prev) => prev + 4);
  };

  useEffect(() => {
    getAllHotels();
  }, []);

  return (
    <>
      {hotels && hotels.length ? (
        hotels.slice(0, page).map((hotel) => (
          <Col key={hotel._id} md={3}>
            <Link
              to={`/hotels/${hotel._id}`}
              className="text-decoration-none text-dark"
            >
              <HotelCard hotel={hotel} />
            </Link>
          </Col>
        ))
      ) : (
        <span>No hotels found!</span>
      )}

      <div className="load">
        <Button
          variant="primary"
          type="submit"
          className="f-h btn"
          onClick={loadHotel}
          style={styleBtn}
        >
          See more {'>>'}
        </Button>
      </div>
    </>
  );
};

export default Hotels;
