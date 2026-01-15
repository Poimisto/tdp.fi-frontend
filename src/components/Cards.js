import React from "react"

import styled from "styled-components"
import CallToAction from "./CallToAction"
import { getContrast, shade } from "polished"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import theme from "./../theme"
import Link from "./Link"
import marked from "marked"

import formatKey from "../utils/formatListKey"

const Cards = styled.div`
  display: grid;
  grid-template-columns: ${props => {
    let result = "1fr"
    for (var i = 1; i < props.cardsPerRow; i++) {
      result = result + " 1fr"
    }
    return result
  }};
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    grid-template-columns: 1fr;
  }
  grid-gap: 20px;
  margin: ${({ $noMargin }) => ($noMargin ? "0" : "20px 0")};
`

const Card = styled.div`
  padding: 10px 20px;
  border: 1px solid ${props => props.theme.colors.light};
  background: ${props => props.theme.colors.light};
  border-radius: 4px;
  span.title {
    display: block;
    font-size: 140%;
    font-family: ${props => props.theme.headingFontFamily};
  }
  background-color: ${props => props.bgColor};
  color: ${props =>
    getContrast(props.theme.colors.darkest, props.bgColor) > 10
      ? props.theme.colors.darkest
      : props.theme.colors.lightest};
  border: 1px solid ${props => shade(0.2, props.bgColor)};
`

const CardsComponent = ({
  cardsPerRow,
  cards,
  cardImages,
  children,
  $noMargin = false,
}) => {
  cards = JSON.parse(cards)
  
  return (
    <Cards cardsPerRow={cardsPerRow} $noMargin={$noMargin}>
      {cards.map(card => {
        let bg = theme.colors[card.bgColor] || theme.colors.lightest

        const cleanPath = card.image?.replace(/^\/*(assets\/)?/, "")
        const imageNode =
          Array.isArray(cardImages) && cardImages.length > 0
            ? cardImages.find(i => i?.relativePath?.endsWith(cleanPath))
            : undefined
        const imageData = getImage(imageNode)

        return (
          <Card bgColor={bg} key={formatKey(card.title)}>
            {card.image && (
              <div style={{ textAlign: "center" }}>
                {imageData ? (
                  <GatsbyImage image={imageData} alt="" />
                ) : (
                  card.image && <img src={card.image} alt="" />
                )}
              </div>
            )}
            {card.link && (
              <Link to={card.link}>
                <span className="title">{card.title}</span>
              </Link>
            )}
            {!card.link && <span className="title">{card.title}</span>}
            <span
              className="content"
              dangerouslySetInnerHTML={{ __html: marked(card.content) }}
            />
            {card.link && card.linkText && (
              <div style={{ marginTop: "10px" }}>
                <CallToAction
                  url={card.link}
                  bgColor={card.linkBgColor || "brand"}
                  align="center"
                >
                  {card.linkText}
                </CallToAction>
              </div>
            )}
          </Card>
        )
      })}
    </Cards>
  )
}

export default CardsComponent
