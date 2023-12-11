import EditMoviePopout from '../MovieForms/EditMoviePopout';
import './Table.css'
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import EditPromotionsForm from '../PromotionsForm/EditPromotionsForm';
import { APIContext, useApiData } from '../../utils/API';
import EditUserForm from '../UserForms/EditUserForm';


//For ManageMovies.jsx: Movie name, Movie director, Rooms, Booking Date(s), Action buttons (add, remove, edit)

//For ManageUsers.jsx: Email, First Name, Last Name, Verification Status (Verified or Not-Verified), Actions (Suspend, Delete) 
    //Add new user button?


const Table = ({ data, pageType, refresh }) => {

  //Select a Certain movie for Editing
  const [selectedMovieData, setSelectedMovieData] = useState(null);




  const api = useContext(APIContext);
  // const [showUserPopout, setShowUserPopout] = useState(false);
  const [showPopout, setShowPopout] = useState(false);
  const [sentPromo, setSP] = useState(false);
      const togglePopout = (movieData) => {
        setShowPopout(!showPopout); 
        setSelectedMovieData(movieData);
        // setShowUserPopout(!showUserPopout);
      };

     
  // Add a function to close the popout
  const closePopout = () => {
    setShowPopout(false);
    if (refresh)
      refresh();
  };
  const removeMovie = async (id) => {
    const response = await api.deleteMovie(id);
    if (response.ok)
      toast.success('Movie removed');
    else
      toast.error(`Error: ${response.message}`);
  };
  const deletePromo = async (id) => {
    const response = await api.deletePromotion(id);
    if (response.ok)
      toast.success('Promotion removed');
    else
      toast.error(`Error: ${response.message}`);
    if (refresh)
      refresh();
  };
  const sendPromo = async (id) => {
    const response = await api.sendPromotion(id);
    if (response.ok)
      toast.success('Promotion sent to subscribers');
    else
      toast.error(`Error: ${response.message}`);
    setSP(true);
    if (refresh)
      refresh();
  };
  const deleteUser = async(id) => {
    try {
      await api.deleteTargetUser(id);
      if (refresh)
        refresh();
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const suspendUser = async(user) => {
    try {
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        wantsPromotions: user.wantsPromotions,
        suspended: true,
      }
      await api.updateTargetUser(user.id, userData);
      refresh();
    } catch (error) {
      console.log('Error:', error);
    }
  }
  const promoteUser = async(user) => {
    try {
      await api.promoteToAdmin(user.id);
      refresh();
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
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.movieTitle}</td>
                      <td>{item.movieDirector}</td>
                      <td>(TODO)</td>
                      <td>{item.movieShowDates}</td>
                      <td>      
                        <button onClick={() => togglePopout(item)}>Edit</button>
                        {showPopout && selectedMovieData === item && (
                          <EditMoviePopout onClose={closePopout} movieData={selectedMovieData} />
                        )}
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
                    <th>Wants Promos</th>
                    <th>Suspended</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item.id}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{`${item.wantsPromotions}`}</td>
                      <td>{`${item.suspended}`}</td>
                      <td>
                        <button onClick={() => suspendUser(item)}>Suspend</button>
                        <br/>
                        <button onClick={() => promoteUser(item)}>Promote</button>
                        <br/>
                        <button onClick={togglePopout}>Edit</button>
                        <br/>
                        {showPopout && <EditUserForm  onClose={closePopout} selected={item}/>}
                        <button onClick={() => deleteUser(item.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            );
          } else if (pageType === 'ManagePromotions') {
            return (
              <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Promotion Code</th>
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
                      <td>{item.promoCode}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.discountPct}</td>
                      <td>{item.expirationDate}</td>
                      <td>
                        
                        <button onClick={togglePopout}>Edit</button>
                        {showPopout && <EditPromotionsForm  onClose={closePopout}/>}


                        <button onClick={() => deletePromo(item.id)}>Remove</button>
                        <button onClick={() => sendPromo(item.id)}>Send</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                {sentPromo && <h1>Request Status: Success</h1>}
            </div>
            )
          }

        };
      
        return <div>{renderTable()}</div>;
      };

export default Table;
