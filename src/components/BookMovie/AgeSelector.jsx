import { useState } from 'react';
import { toast } from 'react-toastify';
import './AgeSelector.css';
import { useApiData } from '../../utils/API';

const AgeSelector = ({ seatNames, pendingOrder, setPendingOrder }) => {
  const [ticketTypes, setTicketTypes] = useState(null);

  useApiData(async (api) => {
    const response = await api.listTicketTypes();
    if (response.ok)
      setTicketTypes(response.data);
    else if (response.type !== 'aborted')
      toast.error(`Error fetching ticket types: ${response.message}`);
  });

  const handleTypeSelect = (e, seatNum) => {
    const type = e.target.value;
    setPendingOrder((order) => ({
      ...order,
      tickets: order.tickets.map((t) => t.seatNum === seatNum ? { seatNum, type } : t)
    }));
  };

  if (!ticketTypes)
    return <></>;

  const options = ticketTypes.map(({ name }) => (
    <option key={name} value={name}>{name}</option>
  ));

  const rows = pendingOrder.tickets.map(({ type, seatNum }) => (
    <label key={seatNum}>
      {seatNames[seatNum]}:{' '}
      <select value={type} onChange={(e) => handleTypeSelect(e, seatNum) }>{options}</select>
    </label>
  ));

  return (
    <div className="select_tickets_row">
      <h3>Select Tickets</h3>

      {rows}
    </div>
  );
};

export default AgeSelector;
