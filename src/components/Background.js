import React, { useMemo, forwardRef } from "react";

const Background = forwardRef(function Background(
  { background = "", zIndex = -1, pointerEvents = "none", style = {}, ...rest },
  ref
) {
  const outerStyle = useMemo(
    () => ({
      position: "absolute",
      inset: 0,            // top/left/right/bottom = 0
      width: "100%",
      height: "100%",
      margin: 0,
      padding: 0,
      zIndex,              // number, not string
      background,
      pointerEvents,       // don’t eat clicks
      ...style,
    }),
    [background, zIndex, pointerEvents, style]
  );

  return <div ref={ref} style={outerStyle} aria-hidden {...rest} />;
});

export default Background;
