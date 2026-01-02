import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { Link } from 'gatsby';

const TableOfContentsContainer = styled.div`
  top: 0;
  position: sticky;
  width: 100%;
  height: fit-content;
  max-height: 80vh;
  overflow: hidden;
  overflow-y: scroll;
`;

const TableOfContentsList = styled.ul`
  width: 100%;
  height: fit-content;
  list-style-type: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  padding: 5px 0px;
  line-height: 120%;
`;

const ListLink = styled(Link)`
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

const flattenAndFormatHeadings = (headings = [], level = 1) => {
  return headings.flatMap(({ title, url, items }) => [
    { title, url: String(url).replace(/^#/, "\\"), level },
    ...flattenAndFormatHeadings(items, level + 1),
  ]);
};

const TableOfContents = ({ headings }) => {
  const tocUpdateRef = useRef(Date.now());
  const listRef = useRef(null);
  const [active, setActive] = useState("");

  const items = useMemo(
    () => flattenAndFormatHeadings(headings.items),
    [headings]
  );

  useEffect(() => {
    const headings = items
      .map(i => document.getElementById(i.url))
      .filter(e => e instanceof HTMLElement);

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          if (Date.now() - tocUpdateRef.current > 250) {
            tocUpdateRef.current = Date.now();
            setActive(`#${visible.target.id}`);
          }
        }
      },
      {
        rootMargin: "-10% 0px -90% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    headings.forEach(h => observer.observe(h));

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const container = listRef.current;

    if (!container || active.length === 0) {
      return;
    }

    const anchors = container.querySelectorAll('a');
    const activeHeading = Array.from(anchors).find(a =>
      a.getAttribute("href") &&
      a.getAttribute("href").endsWith(active)
    )

    if (!activeHeading) {
      return;
    }

    activeHeading.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [active]);

  if (!headings.items) {
    return <TableOfContentsContainer />;
  }

  return (
    <TableOfContentsContainer>
      <TableOfContentsList ref={listRef}>
        {items.map(item => (
          <ListItem
            key={item.url}
            style={{ marginLeft: `${(item.level - 1) * 15}px` }}
          >
            <ListLink
              to={`#${item.url}`}
              key={item.url}
              className={active === `#${item.url}` ? "active" : ""}
              onClick={() => {
                setActive(`#${item.url}`)
                tocUpdateRef.current = Date.now()
              }}
              replace
            >
              {item.title}
            </ListLink>
          </ListItem>
        ))}
      </TableOfContentsList>
    </TableOfContentsContainer>
  );
}

export default TableOfContents
