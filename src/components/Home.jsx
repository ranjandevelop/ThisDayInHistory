import React, { useEffect, useState } from "react";
import Events from "./Events";
import Featured from "./Featured";
import Birthdays from "./Birthdays";

const Home = () => {
  const [month, setMonth] = useState("01");
  const [day, setDay] = useState("01");

  console.log("month", month, "day", day);

  useEffect(() => {
    const date = new Date();
    setDay(date.getDate().toString());
    setMonth((date.getMonth() + 1).toString());
    // console.log("montht", date.getDate(), "dayt", date.getMonth() + 1);
  }, []);

  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleChange = (e) => {
    console.log(typeof e.target.value);
    const input = e.target.value;
    const splitInput = input.split("-");
    setMonth((parseInt(splitInput[1], 10) - 1).toString());
    setDay(splitInput[2]);
  };

  return (
    <>
      <section className="p-9 flex justify-between flex-wrap border-shadow px-9 bg-indigo-50">
        <div className="text-xl font-bold m-1 md:m-1">
          This day in History:{" "}
          <span className="text-blue-800">{`${
            monthName[parseInt(month, 10) - 1]
          }, ${day}`}</span>
        </div>
        <span className="m-1 md:m-1">
          <label className="text-xl font-bold">
            What happened on your birthday:{" "}
          </label>
          <input
            type="date"
            name=""
            id="inputDate"
            onChange={handleChange}
            className="border rounded"
            placeholder="date"
          />
        </span>
      </section>

      <section className="border grid md:grid-cols-12 bg-indigo-50">
        <div className="col-span-8 border flex justify-center items-center p-4">
          <Featured month={month} day={day} />
        </div>
        <div className="col-span-4 m-4">
          <Birthdays month={month} day={day} />
        </div>
      </section>

      <section className="bg-indigo-100">
        <Events month={month} day={day} />
      </section>

      <section>
        <footer className="text-center p-4">
          <a href="https://github.com/ranjandevelop">ranjandevelop</a> &copy;
          2024
        </footer>
      </section>
    </>
  );
};

export default Home;
