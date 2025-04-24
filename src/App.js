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
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.eventName &&
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const indexOfLastEvent = currentPage * EVENTS_PER_PAGE;
  const indexOfFirstEvent = indexOfLastEvent - EVENTS_PER_PAGE;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  if (loading) return <p className="text-center mt-10">Loading events...</p>;

  return (
    <div className="w-full min-h-screen bg-[#E82677] py-10 px-4 sm:px-8">
      <div className="bg-white rounded-md max-w-7xl mx-auto p-4 sm:p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl font-semibold mt-6">Events</h1>
          <p className="text-sm sm:text-base text-center mt-2 max-w-xl">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
            sed quia consequuntur.
          </p>

          <div className="w-full mt-6 flex justify-end">
            <input
              type="text"
              placeholder="Search events by name..."
              className="border p-2 sm:p-3 rounded w-full sm:w-1/2 md:w-1/3"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="grid gap-4 mt-8 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

          <div className="flex flex-wrap justify-center mt-8 gap-2">
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
