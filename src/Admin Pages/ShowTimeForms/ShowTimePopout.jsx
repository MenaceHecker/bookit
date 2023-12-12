import '../Table/Table.css';
import './ShowTimePopout.css';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { APIContext, useApiData } from '../../utils/API';
const ShowTimePopout = ({ onClose, movieData }) => {
    const [newShowtime, setNewShowtime] = useState({
        showroomId: 1,
        movieId: movieData.id,
        startTime: '',
        durationMins:0,
    });
    const [showTimes, setShowTimes] = useState([]);
    const [showRooms, setShowRooms] = useState([]);
    const api = useContext(APIContext);
    const [refreshShowTimes] = useApiData(async (api, tools) => {
        const response = await api.listShowings(movieData.id);
        if (response.ok)
            setShowTimes(response.data);
        else if (response.type !== 'aborted')
            toast.error(`Error fetching listings: ${response.message}`);
        tools.refreshOnTimeout(60000);
    }, { api });
    const [refreshShowRooms] = useApiData(async (api, tools) => {
        const response = await api.listShowrooms();
        if (response.ok)
            setShowRooms(response.data);
        else if (response.type !== 'aborted')
            toast.error(`Error fetching listings: ${response.message}`);
        tools.refreshOnTimeout(60000);
    }, { api });
    const handleAddShowtime = async () => {
        const time = new Date(newShowtime.startTime).toISOString();
        const sent = newShowtime;
        sent.startTime = time;
        const response = await api.createShowing(sent);
        if (response.ok) {
            console.log(response)
            refreshShowTimes();
        } else if (response.type !== 'aborted')
            console.log (response)
            toast.error(`Error fetching listings: ${response.message}`);
    };

    const handleRemoveShowtime = async (showingid) => {
        const response = await api.deleteShowing(showingid)
        if (response.ok) {
            console.log(response)
            refreshShowTimes();
        } else if (response.type !== 'aborted')
            console.log (response)
        toast.error(`Error fetching listings: ${response.message}`);
    };

    return (
        <div className="showtime-popout">
            <h2>Showtimes for {movieData.movieTitle}</h2>
            <ul>
                {showRooms.map((showroom, index) => (
                    <li key={index} id={'showtime-li'}>
                        <p>Room: {showroom.id}</p>
                        <p>Total Seats: {showroom.totalSeats}</p>
                        <button onClick={(e) => setNewShowtime({ ...newShowtime, showroomId: showroom.id})}>Select</button>
                    </li>
                ))}
            </ul>
            <ul>
                {showTimes.map((showtime, index) => (
                    <li key={index}>
                        <p>{showtime.startTime}</p>
                        <button onClick={() => handleRemoveShowtime(showtime.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <div>
                <p>Show Time</p>
                <input
                    type="datetime-local"
                    value={newShowtime.startTime}
                    onChange={(e) => setNewShowtime({ ...newShowtime, startTime: e.target.value })}
                />
                <br/>
                <p>Duration in Minutes</p>
                <input
                    type="number"
                    placeholder="Duration in minutes"
                    value={newShowtime.durationMins}
                    onChange={(e) => setNewShowtime({ ...newShowtime, durationMins: e.target.value })}
                />
                <br/>
                <p>Room Location: {newShowtime.showroomId}</p>
                <br/>
                <button onClick={handleAddShowtime}>Add</button>
            </div>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ShowTimePopout;
