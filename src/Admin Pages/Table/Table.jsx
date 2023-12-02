import EditMoviePopout from '../MovieForms/EditMoviePopout';
import './Table.css'
import { useContext, useState } from 'react';
import EditPromotionsForm from '../PromotionsForm/EditPromotionsForm';
import { APIContext } from '../../utils/API';


//For ManageMovies.jsx: Movie name, Movie director, Rooms, Booking Date(s), Action buttons (add, remove, edit)

//For ManageUsers.jsx: Email, First Name, Last Name, Verification Status (Verified or Not-Verified), Actions (Suspend, Delete) 
    //Add new user button?


const Table = ({ data, pageType }) => {
  const api = useContext(APIContext);
  const [showPopout, setShowPopout] = useState(false);

      const togglePopout = () => {
        setShowPopout(!showPopout);
      };

     
  // Add a function to close the popout
  const closePopout = () => {
    setShowPopout(false);
  };

  const removeMovie = async (id) => {
    try {
      await api.deleteMovie(id);
    } catch (error) {
      console.log('Error:', error);
    }
  };

        const renderTable = () => {
          //ManageMovies.jsx
         // let filteredData;
           if (pageType === 'ManageMovies') {
          //   if (movieType === 'currentlyShowing') {
          //     filteredData = data.filter(item => item.bookingDates.some(date => new Date(date) <= new Date())); // Filter movies with booking dates in the past or today
          //   } else if (movieType === 'comingSoon') {
          //     filteredData = data.filter(item => item.bookingDates.every(date => new Date(date) > new Date())); // Filter movies with all booking dates in the future
          //   }
            return (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Movie name</th>
                    <th>Movie director</th>
                    <th>Rooms</th>
                    <th>Booking Date(s)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item.id}>
                      <td>{item.movieTitle}</td>
                      <td>{item.movieDirector}</td>
                      <td>(TODO)</td>
                      <td>{item.movieShowDates}</td>
                      <td>      
                        <button onClick={togglePopout}>Edit</button>
                        {showPopout && <EditMoviePopout onClose={closePopout} />}
                        <button onClick={() => removeMovie(item.id)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            );


          //ManageUsers.jsx
          } else if (pageType === 'ManageUsers') {
            return (
              <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Verification Status</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item.id}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.verificationStatus}</td>
                      <td>{item.type}</td>
                      <td>
                        <button>Suspend</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            );
          } else if (pageType == 'ManagePromotions') {
            return (
              <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Promotion Name</th>
                    <th>Brief Description</th>
                    <th>Percentage</th>
                    <th>Expiration Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item.id}>
                      <td>{item.promotionName}</td>
                      <td>{item.promotionDescription}</td>
                      <td>{item.promotionPercentage}</td>
                      <td>{item.promotionExpDate}</td>
                      <td>
                        
                        <button onClick={togglePopout}>Edit</button>
                        {showPopout && <EditPromotionsForm  onClose={closePopout}/>}


                        <button>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )
          }

        };
      
        return <div>{renderTable()}</div>;
      };

export default Table;
