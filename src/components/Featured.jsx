import React, { useEffect, useState } from "react";

const Featured = ({ month, day }) => {
  const [featured, setFeatured] = useState([]);

  const [featuredImg, setFeaturedImg] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.selected && data.selected.length > 0) {
          setFeaturedImg(data.selected[0].pages[0].originalimage?.source);
          return setFeatured(data.selected[0]);
        } else {
          return setFeatured(null);
        }
      });
  }, [month, day]);
  return (
    <>
      {featured ? (
        <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row">
          <div className="relative w-[29%] m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0 hidden sm:block">
            <img
              src={featuredImg ? featuredImg : ""}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-6">
            <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
              {featured.year}
            </h6>
            <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {/* {featured.text} */}
            </h4>
            <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              {featured.text}
            </p>
          </div>
        </div>
      ) : (
        <span>Loading</span>
      )}
    </>
  );
};

export default Featured;
