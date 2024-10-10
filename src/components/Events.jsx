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
      {/* <span className="p-4">More Events</span> */}
      <div className="flex flex-wrap justify-center p-4 border">
        {events
          ? events.map((event, index) => (
              <article
                key={index}
                class="card mx-auto w-min md:w-72 bg-white rounded-lg p-2 text-gray-800 m-4"
              >
                <section
                  class="card__hero bg-orange-100 rounded-t-lg p-6 text-sm h-[190px]"
                  style={{
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "200px",
                  }}
                >
                  <header class="card__hero-header flex justify-between items-center">
                    {/* <button class="card__btn w-full md:w-auto font-normal border-none cursor-pointer text-center py-2 px-5 rounded-lg bg-gray-800 text-white text-base">
              2019
            </button> */}
                    <span>{event.year}</span>
                    <div class="card__icon">
                      <svg
                        height="20"
                        width="20"
                        stroke="currentColor"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                          stroke-linejoin="round"
                          stroke-linecap="round"
                        ></path>
                      </svg>
                    </div>
                  </header>
                </section>

                <section class="card__footer flex flex-col p-3 gap-4 font-bold text-sm md:flex-row md:items-center md:justify-between">
                  <div class="card__job-summary flex items-center gap-3">
                    <div class="card__job">
                      <p class="card__job-title">{event.text}</p>
                    </div>
                  </div>
                </section>
              </article>
            ))
          : "Loading...."}
      </div>
    </>
  );
};

export default Events;
