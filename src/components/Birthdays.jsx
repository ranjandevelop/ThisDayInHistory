import React, { useEffect, useState } from "react";

const Birthdays = ({ month, day }) => {
  const [birthdays, setBirthdays] = useState("");
  useEffect(() => {
    fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`
    )
      .then((response) => response.json())
      .then((data) => setBirthdays(data.births.slice(0, 24)));
  }, [month, day]);
  console.log(birthdays);
  return (
    <>
      <span>Birthdays</span>
      <div className="flex flex-wrap justify-center items-center p-4 h-[400px] overflow-scroll scroll-smooth cursor-all-scroll">
        {birthdays ? (
          birthdays.map((birth, index) => (
            <div
              href="#"
              className="max-w-sm p-4 flex items-center bg-white border border-gray-200 rounded-lg m-4 shadow hover:bg-gray-100"
              key={index}
            >
              <h4 className="p-1 border rounded-full bg-fuchsia-900 text-white px-4 mx-4">
                {birth.year}
              </h4>
              <h5 className="text-md font-bold tracking-tight text-gray-900">
                {birth.text.split(",")[0]} ,
                <span className="font-normal">{birth.text.split(",")[1]}</span>
              </h5>
            </div>
          ))
        ) : (
          <span>Loading</span>
        )}
      </div>
    </>
  );
};

export default Birthdays;
