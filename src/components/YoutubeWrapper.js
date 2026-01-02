import React from "react"
import styled from "styled-components"

const VideoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;

  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    margin-bottom: 16px;
  }
`

const YoutubeWrapper = ({ videoUrl }) => {
  if (!videoUrl || typeof videoUrl !== "string") {
    return <></>
  }

  return (
    <VideoWrapper>
      <iframe
        width="100%"
        height="100%"
        src={videoUrl}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
    </VideoWrapper>
  )
}

export default YoutubeWrapper
