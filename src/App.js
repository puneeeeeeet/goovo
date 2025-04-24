import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Card } from "./components/Card.js";

const EVENTS_PER_PAGE = 20;

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://67ff48fa58f18d7209f09751.mockapi.io/v1/events")
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  // const indexOfLastEvent = currentPage * EVENTS_PER_PAGE;
  // const indexOfFirstEvent = indexOfLastEvent - EVENTS_PER_PAGE;
  const filteredEvents = events.filter(event =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  
  const indexOfLastEvent = currentPage * EVENTS_PER_PAGE;
  const indexOfFirstEvent = indexOfLastEvent - EVENTS_PER_PAGE;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  

  if (loading) return <p>Loading events...</p>;
  return (
    <div className="w-screen h-full bg-[#E82677] py-20">
      <div className="bg-white  mx-20 rounded-md relative">
        <div className="flex justify-center items-center flex-col">
          <div className="mt-14 text-2xl">Events</div>
          <div className="flex items-center justify-center text-sm w-2/5 text-center">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur.
            
          </div>
         
          <div className="w-full relative">
          <input
            type="text"
            placeholder="Search events by name..."
            className="border p-4 mr-16 rounded mb-6 w-1/3 absolute inset-y-0 right-0"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset to first page on search
            }}
          />
          </div>

          <div className="grid gap-3  mt-10 grid-cols-4">
            
            {currentEvents.map((event) => (
              <Card
                key={event.id}
                name={event.eventName}
                location={event.location}
                date={event.date}
                organizer={event.organizer}
              />
            ))}
          </div>
          <div className="flex justify-center mt-6 space-x-2 pb-10">
            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === pageNum
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
