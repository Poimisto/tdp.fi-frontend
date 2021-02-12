import React from 'react'
import marked from 'marked';
import {MDXProvider} from '@mdx-js/react'
import {MDXRenderer} from 'gatsby-plugin-mdx';

const PreviewTemplate = ({ entry, widgetFor }) => {
  const js = entry.getIn(['data']).toJS();

  return (
    <div dangerouslySetInnerHTML={{__html : marked(js.body)}} />     
  )
}
export default PreviewTemplate