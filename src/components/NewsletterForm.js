import React, {useState} from "react";
import HeroBlock from './HeroBlock'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl'
import CallToAction from './CallToAction'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';

import addToMailchimp from 'gatsby-plugin-mailchimp'

const FormWrapper = styled.div`
  position:relative;
  margin:20px 0px;
  padding: 30px;
  border:  2px solid ${props => props.theme.colors.light};
  .success {
    color: ${props => props.theme.colors.success};
  }
  .error {
    color: ${props => props.theme.colors.danger};
  }
`;
const LoadingOverlay = styled.div`
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  z-index:999;
  background:rgba(0,0,0,0.3);
  display:flex;
  align-items:center;
  justify-content:center;
`;
const SmallText = styled.p`
  font-size: 0.75em;

`;
export default (props) => {
  const [formFields, setFormFields] = useState({})
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
  const [isSubmitError, setIsSubmitError] = useState(false)


  const setFormValue = (name, value) => {
    let newFormFields = Object.assign({}, formFields);
    newFormFields[name] = value;
    setFormFields(newFormFields)
  } 
  const validateErrors = () => {
    let submitErrors = {}, hasErrors;
    if (!formFields['email']) {
      hasErrors = true; 
      submitErrors['email'] = 'Sähköposti on pakollinen tieto';
    } 
    if (hasErrors) {
      console.log(submitErrors)
      setErrors(submitErrors);
      return 1;
    }
    else return 0;
  }
  const submitForm = () => {
    if ( !validateErrors() ) {
      setIsLoading(true)

      window.dataLayer = window.dataLayer || [];

      let additionalParams = {
        SOURCE: 'Website',
        MMERGE6: formFields.company || '',
      }
      
      // this does not work for some reason, maybe not supported by the plugin
      // if (props.mailchimpTags) additionalParams.tags = props.mailchimpTags
      
      addToMailchimp(formFields.email, additionalParams)
      .then((data) => {
        setIsLoading(false)
        setIsSubmitSuccess(true)
        window.dataLayer.push({event:"form submit", form: "uutiskirje"});

        if (props.redirectTo) {
          setTimeout(() => {
            window.open(props.redirectTo, '_blank')
          }, 1000)
     
        }
      })
      .catch( (e)  => {
        setIsLoading(false)
        setIsSubmitError(true);
        window.dataLayer.push({event:"error", error : "form error", detail : e.message});
      }) 
    }
  }

  return (


      <FormWrapper>
        {isLoading && (
          <LoadingOverlay>
            <CircularProgress/>
          </LoadingOverlay>
        )}

        <h2>{props.title || 'Tilaa uutiskirje'}</h2>

        <div>
        
          <FormControl fullWidth>

            <TextField error={!!errors.email} helperText={!!errors.email ? errors.email : ''} onChange={(e) => setFormValue('email', e.target.value)} variant="filled" label="Sähköposti" />
            <TextField error={!!errors.company} helperText={!!errors.company ? errors.company : ''} onChange={(e) => setFormValue('company', e.target.value)} variant="filled" label="Yritys" />

          </FormControl>

          {isSubmitSuccess && (
            <div className="success">
              <p>
                {props.successMessage ?  props.successMessage:'Kiitos tilauksesta!'} 
              </p>
              {props.redirectTo ? (
                <p>Selain aukaisee pian uuden ikkunan. Voit myös siirtyä tiedostoon <a target="_blank" href={props.redirectTo}>tästä linkistä</a></p>
               ) : ''}

            </div>
          )}
          {!isSubmitSuccess && (
            <p>
              <CallToAction bgColor="brand" onClick={submitForm}>{props.ctaText ? props.ctaText : 'Tilaa uutiskirje'}</CallToAction>
              
              <SmallText>Voit koska tahansa lopettaa uutiskirjeen tilauksen. Tietojasi ei luovuteta kolmansille osapuolille. </SmallText>
            </p>
          )}
          {isSubmitError && (
            
            <div className="error">
              Hmm... Lomakkeen lähetyksessä tapahtui virhe. Yritä ottaa yhteyttä sähköpostilla tai puhelimella.
            </div>
          )}

        </div>

    </FormWrapper>


  );
}
