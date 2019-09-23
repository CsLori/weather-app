import React from 'react';

const Weather = ({
  city,
  country,
  celsius,
  temp_max,
  temp_min,
  description,
  weatherIcon
}) => {
  return (
    <div className="container text-light">
      <div className="cards pt-4">
        <h1>{city}</h1>
        <h5 className="py-4">
          <i className={`wi ${weatherIcon} display-1`}></i>
        </h5>
        {celsius ? <h1 className="py-2">{celsius}&deg;</h1> : null}
        {minMaxTemp(temp_min, temp_max)}
        <h4 className="py-2">{description}</h4>
      </div>
    </div>
  );
};

function minMaxTemp(min, max) {
  if (min && max)
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
}
export default Weather;
