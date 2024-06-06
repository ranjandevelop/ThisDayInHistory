import React, { useState, useEffect } from "react";

const Events = ({ month, day }) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`
    )
      .then((response) => response.json())
      .then((data) => {
        const eventData = [];
        if (data.events && data.events.length > 0) {
          data.events.forEach((element, index) => {
            eventData.push({
              text: element.text,
              image: element.pages[0].originalimage?.source,
              year: element.year,
            });
          });
        }
        return setEvents(eventData);
      });
  }, [month, day]);
  return (
    <>
      <span className="p-4">More Events</span>
      <section className="flex flex-wrap justify-center p-4 border">
        {events
          ? events.map((event, index) => (
              <div
                key={index}
                className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 m-4 h-fit"
              >
                <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                  <img src={event.image} alt="card-image" />
                </div>
                <div className="p-6">
                  <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {/* {event.text} */}
                  </h5>
                  <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    {event.text}
                  </p>
                </div>
                <div className="m-4">
                  <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[19px] font-semibold text-gray-900">
                    {event.year}
                  </span>
                </div>
              </div>
            ))
          : "Loading...."}
      </section>
    </>
  );
};

export default Events;
