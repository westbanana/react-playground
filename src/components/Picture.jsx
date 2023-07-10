import React from "react";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";

function Picture({ id, url }) {
  console.log(url)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  Picture.propTypes = {
    url: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }
  return (
   <>
     <img
       ref={drag}
       src={url}
       width="150px"
       style={{ border: isDragging ? "5px solid pink" : "0px" }}
     />
   </>
  );
}

export default Picture;