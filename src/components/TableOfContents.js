import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

const TableOfContentsContainer = styled.div`
  top: 0;
  position: sticky;
  width: 100%;
  height: fit-content;
  max-height: 80vh;
  overflow: hidden;
  overflow-y: scroll;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    display: none;
  }
`;

const TableOfContentsList = styled.ul`
  width: 100%;
  height: fit-content;
  list-style-type: none;
  padding-left: 0;
`;

const TitleListItem = styled.li`
  padding: 5px 0px;
  line-height: 120%;
  font-size: 1.1em;
`;

const ListItem = styled.li`
  padding: 5px 0px;
  line-height: 120%;
`;

const ListLink = styled.a`
  color: ${props => props.theme.colors.dark};
  &:hover {
    text-decoration: underline;
  }
  &.active {
    font-weight: 700;
    color: ${props => props.theme.colors.darkest};
    text-decoration: none;
  }
`;

const flattenHeadings = (headings = [], level = 1) => {
  return headings.flatMap(({ title, url, items }) => [{ title, url, level }, ...flattenHeadings(items, level + 1)])
}

export default ({ headings }) => {
  if (!headings.items) {
    return <TableOfContentsContainer />
  }

  const listRef = useRef(null);
  const [active, setActive] = useState("");

  const items = useMemo(() => flattenHeadings(headings.items), [headings]);

  useEffect(() => {
    const headings = items.map(i => document.querySelector(i.url)).filter(e => e instanceof HTMLElement);

    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setActive(`#${visible.target.id}`)
      }
    }, {
      rootMargin: "-10% 0px -90% 0px",
      threshold: [0, 0.25, 0.5, 1]
    })

    headings.forEach(h => observer.observe(h));

    return () => observer.disconnect();
  }, [items])

  useEffect(() => {
    const container = listRef.current

    if (!container) {
      return
    }

    const activeHeading = container.querySelector(`a[href="${active}"]`)

    if (!activeHeading) {
      return
    }

    activeHeading.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active])

  return <TableOfContentsContainer>
    <TableOfContentsList ref={listRef}>
      {items.map(item =>
        <ListItem key={item.url} style={{ marginLeft: `${(item.level - 1) * 15}px` }}>
          <ListLink href={item.url} key={item.url} className={active === item.url ? "active" : ""} onClick={(e) => setActive(e.target.id)}>
            {item.title}
          </ListLink>
        </ListItem>)}
    </TableOfContentsList>
  </TableOfContentsContainer>
}