import React from 'react';
import styled from 'styled-components';

const YoutubeWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;

  @media(max-width: ${props => props.theme.mobileBreakpoint}px) {
    margin-bottom: 16px;
  }
`

export default ({ videoUrl }) => {
  if (!videoUrl || typeof videoUrl !== 'string') {
    return <></>
  }

  return (
    <YoutubeWrapper>
      <iframe
        width="100%"
        height="100%"
        src={videoUrl}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen />
    </YoutubeWrapper>
  )
}