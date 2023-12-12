import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './BookMovie.css';
import AgeSelector from './AgeSelector';
import MovieDetail from './MovieDetail';
import SeatSelector from './SeatSelector';
import ShowTimeSelector from './ShowTimeSelector';
import { useApiData } from '../../utils/API';

const BookMovie = ({ selectedMovie, pendingOrder, setPendingOrder }) => {
  const movieId = selectedMovie.id;
  const movieTitle = selectedMovie.movieTitle;
  const navigate = useNavigate();
  const [showings, setShowings] = useState(null);
  const [freeSeats, setFreeSeats] = useState([]);

  useApiData(async (api) => {
    const response = await api.listShowings(movieId);
    if (response.ok)
      setShowings(response.data);
    else if (response.type !== 'aborted')
      toast.error(`Error fetching showings: ${response.message}`);
  }, { deps: [movieId] });

  const selectedShowing = showings?.find((showing) => showing.id === pendingOrder.showingId);

  useApiData(async (api) => {
    if (!selectedShowing)
      return;
    const response = await api.listFreeSeats(selectedShowing.id);
    if (response.ok)
      setFreeSeats(response.data);
    else if (response.type !== 'aborted')
      toast.error(`Error fetching free seats: ${response.message}`);
  }, { deps: [selectedShowing] });

  useEffect(() => {
    if (showings && showings.length > 0 && !selectedShowing)
      setPendingOrder((order) => ({ ...order, showingId: showings[0].id, tickets: [] }));
  }, [showings, selectedShowing]);

  if (!selectedShowing)
    return <></>;

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8];
  const seatNames = rows.flatMap(row => columns.map(col => `${row}${col}`));
  
  const handleTimeSelect = (e) => {
    setPendingOrder((order) => ({ ...order, showingId: +e.target.value }));
  };

  const checkNow = () => {
    navigate('/Checkout');
  };

  return (
    <div className="book_movie_container">
      <div className="movie_detail">
        <MovieDetail selectedMovie={movieTitle}/>
      </div>

      <div className="show_time_selector">
        <ShowTimeSelector {...{showings, pendingOrder, handleTimeSelect}}/>
      </div>

      <div className="seat_selector">
        <SeatSelector {...{seatNames, freeSeats, pendingOrder, setPendingOrder}}/>
      </div>
      
      <div className="age_selector">
        <AgeSelector {...{seatNames, pendingOrder, setPendingOrder}}/>
      </div>

      <button onClick={() => checkNow()} className="book_movie_button">Proceed to Checkout</button>
    </div>
  );
};
 
export default BookMovie;
