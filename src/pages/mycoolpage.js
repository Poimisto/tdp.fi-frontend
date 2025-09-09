import React, {useState, useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress'

const widgetExperimentId = '20Cd20iESRSgpQSfhsr8iw';

export default () => {

  const [widget, setWidget] = useState(<CircularProgress />);

  const showOldWidget = () => {
    setWidget((
      <div>
        <iframe title="ajanvaraus" allow="geolocation" src="https://ajanvaraus.mehilainen.fi/widget/mode:front/lang:fi/results:1" 
        className="FrontPage__Iframe-fxrbnc-4 eXZqZg" id="iFrameResizer0" scrolling="no" style={{width:'900px', height: '600px'}}>

        </iframe>
      </div>
    ));
  }
  const showNewWidget = () => {
    setWidget((
      <div>
        <h2>This is the new widget</h2>
      </div>
    ))
  }
  useEffect(() => {
    const showWidget = (value) => {
      if (value === '1' || value === '2')  {
        console.log('showing new widget');
        showNewWidget();
      }
      else {
        console.log('failing back to old widget') 
        showOldWidget();
      }

    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {window.dataLayer.push(arguments)}
    window.gtag('event', 'optimize.callback', {
      name: widgetExperimentId,
      callback: showWidget
    });

    setTimeout( () => {
      // show old widget if optimize fails to load in 2 seconds or if the experiment is misconfigured
      if (!window.google_optimize || !window.google_optimize.get(widgetExperimentId)) showOldWidget();
    }, 2000)

    return () => {
      window.gtag('event', 'optimize.callback', {
        name: widgetExperimentId,
        callback: showWidget,
        remove: true
      });
    }

  }, [] )

  return (
    <div>
      <h1>Hello world</h1>
        {widget}
    </div>
  )
}

