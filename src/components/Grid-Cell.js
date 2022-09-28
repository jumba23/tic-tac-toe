import React from "react";

const GridCell = ({ handleClick, index, element }) => {
  const handleOneClick = (e) => {
    return !element ? handleClick(e.currentTarget.id) : null;
  };

  return (
    <>
      <div onClick={handleOneClick} className="grid-cell" id={index}>
        {element}
      </div>
    </>
  );
};
export default GridCell;