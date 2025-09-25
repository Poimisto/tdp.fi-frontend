import React from "react";
import { Link as GatsbyLink } from "gatsby";

/*
 * Used to dynamically swap CMS links with appropriate Gatsby links.
 * Internal links start with "/" or "#".
 * External links are everything else (http, https, mailto, tel, //, etc).
 */

const isInternal = (to) => {
  if (!to) return false;
  return to.startsWith("/") || to.startsWith("#");
};

const AppLink = ({
  children,
  to = "#",
  activeClassName,
  partiallyActive,
  target,
  rel,
  onClick,
  // Strip out styling-only props that might be passed by styled-components wrappers
  bgColor,   // eslint-disable-line no-unused-vars
  $bg,       // eslint-disable-line no-unused-vars
  align,     // eslint-disable-line no-unused-vars
  $align,    // eslint-disable-line no-unused-vars
  ...rest
}) => {
  if (isInternal(to)) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...rest}
      >
        {children}
      </GatsbyLink>
    );
  }

  // External link: ensure security attrs when opening a new tab
  const computedRel =
    target === "_blank"
      ? ["noopener", "noreferrer", rel].filter(Boolean).join(" ")
      : rel;

  return (
    <a href={to} target={target} rel={computedRel} onClick={onClick} {...rest}>
      {children}
    </a>
  );
};

export default AppLink;
