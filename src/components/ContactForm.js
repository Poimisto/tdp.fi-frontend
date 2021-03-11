import React, {useState} from "react";
import HeroBlock from './HeroBlock'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import CallToAction from './CallToAction'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';


const FormWrapper = styled.div`
  display:grid;
  grid-template-columns:1fr 0.5fr;
  grid-gap:10px;
  @media (max-width: ${props => props.theme.mobileBreakpoint}px) {
    grid-template-columns:1fr;
  }
  .success {
    color: ${props => props.theme.colors.success};
  }
  .error {
    color: ${props => props.theme.colors.danger};
  }
  .contactPerson {
    text-align:center;
    span {
      display:block;
    }
    .name {
      font-size:1.2em;
      font-family:${props => props.theme.headingFontFamily};
    }
    .img {
      border-radius:50%;
    }
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
    if (!formFields['name']) {
       hasErrors = true; 
       submitErrors['name'] = 'Nimi on pakollinen tieto';
    } 
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
      let data = new URLSearchParams();
      Object.keys(formFields).forEach( (key) => {
        data.append(key, formFields[key])
      })
      data.append('source', window.location.href)
      data.append('formID', 'contact-form');

      window.dataLayer = window.dataLayer || [];

      fetch(process.env.GATSBY_ContactApiEndpoint, {
          method: "POST",
          mode: "cors",
          body : data,
          headers : {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
      })
      .then(res => res.json())
      .then((result) => {
        setIsLoading(false)
        setIsSubmitSuccess(true)
        window.dataLayer.push({event:"form submit", form: "tarjouspyynto"});
      })
      .catch( (e)  => {

        setIsLoading(false)
        setIsSubmitError(true);
        window.dataLayer.push({event:"error", error : "form error", detail : e.message});
      }) 
    }
  }

  return (
    <HeroBlock bgColor="dark" columns={1}  id="contact-form">

      <h2>{props.title || 'Pyydä tarjous'}</h2>

      <FormWrapper>
        {isLoading && (
          <LoadingOverlay>
            <CircularProgress/>
          </LoadingOverlay>
        )}

        <div>
        
          {props.checkboxes && (
            <>
              <FormControlLabel
                control={<Checkbox color="primary" onChange={(e) => setFormValue('suora-kauppa', e.target.checked)} />}
                label="Suora kauppa"
                labelPlacement="end"
              />
              <FormControlLabel
                control={<Checkbox color="primary" onChange={(e) => setFormValue('leasing-sopimus', e.target.checked)} />}
                label="Leasing-sopimus"
                labelPlacement="end"
              />
              <FormControlLabel
                control={<Checkbox color="primary" onChange={(e) => setFormValue('palvelusopimus', e.target.checked)} />}
                label="Palvelusopimus"
                labelPlacement="end"
              />
            </>
          )}
          <FormControl fullWidth>
            <TextField multiline={true} rows={3} name="message" onChange={(e) => setFormValue('message', e.target.value)} label="Viesti" variant="filled" 
              placeholder="Mistä haluatte tarjouksen? Voitte myös jättää tämän kentän tyhjäksi, niin otamme teihin yhteyttä." />

            <TextField error={!!errors.name} helperText={!!errors.name ? errors.name : ''} onChange={(e) => setFormValue('name', e.target.value)} variant="filled" label="Yhteyshenkilön nimi" />

            <TextField error={!!errors.email} helperText={!!errors.email ? errors.email : ''} onChange={(e) => setFormValue('email', e.target.value)} variant="filled" label="Sähköpost" />

            <TextField variant="filled" onChange={(e) => setFormValue('phone', e.target.value)} variant="filled" label="Puhelinnumero" />

            <input type="text" style={{display:'none'}} onChange={(e) => setFormValue('phone', e.target.value)} name="__zipcode" />
          </FormControl>

          {isSubmitSuccess && (
            <div className="success">Viesti lähetetty onnistuneesti!</div>
          )}
          {!isSubmitSuccess && (
            <p>
              <CallToAction bgColor="brand" onClick={submitForm}>Lähetä</CallToAction>
            </p>
          )}
          {isSubmitError && (
            
            <div className="error">
              Hmm... Lomakkeen lähetyksessä tapahtui virhe. Yritä ottaa yhteyttä sähköpostilla tai puhelimella.
            </div>
          )}

        </div>


        {props.contactName && (
          <div className="contactPerson">
            <img className="img" src={props.contactImage} />
            <span className="name">{props.contactName}</span>
            <span className="title">{props.contactTitle}</span>
            <span className="phone">{props.contactPhone}</span>
            <span className="email">{props.contactEmail}</span>
          </div>

        )}


    </FormWrapper>

  </HeroBlock>

  );
}
