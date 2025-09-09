// src/cms/preview-templates/page.js
import React from "react";

/**
 * Decap CMS preview for "page". We just render the CMS-provided widget
 * (which already knows how to preview the body field).
 */
const PreviewTemplate = ({ widgetFor }) => {
  const bodyEl = widgetFor && widgetFor("body");
  return <div style={{ padding: 16 }}>{bodyEl}</div>;
};

export default PreviewTemplate;
