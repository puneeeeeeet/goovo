import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Card } from "./components/Card.js"
function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://67ff48fa58f18d7209f09751.mockapi.io/v1/events')
      .then(response => {
        setEvents(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);
 

  if (loading) return <p>Loading events...</p>;
  return (
    <div className="w-screen h-[600vh] bg-[#E82677] relative">
      <div className=" inset-0 bg-white mt-14 mx-20 rounded-md absolute ">
        <div className="flex justify-center items-center flex-col">
          <div className="mt-14 text-2xl">Events</div>
          <div className="flex items-center justify-center text-sm w-2/5 text-center">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.</div>
            <div className="grid gap-3  mt-10 grid-cols-5">
              {events.map(event => (
        <Card
          key={event.id}
          name={event.name}
          location={event.location}
          date={event.date}
          organizer={event.organizer}
        />
      ))}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
