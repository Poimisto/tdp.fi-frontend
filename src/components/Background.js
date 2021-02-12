import React, {useEffect} from 'react';
import styled from 'styled-components';


const Background = (props) => {
  const ref = React.createRef()
  useEffect( () => {
  }, []);
  const outerStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    zIndex: "-1",
    background: props.background ? props.background : ""
  };

  return (
    <div ref={ref} style={outerStyle}>
    </div>
  )
}

export default Background;