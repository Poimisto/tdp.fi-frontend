// src/components/SupportPricingCalculator.js
import React, { useEffect, useState } from 'react';
import theme from '../theme';
import styled from 'styled-components';

import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Slider from '@mui/material/Slider';

const CalculatorContainer = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  width: calc(100% - 2 * 1em);
  height: fit-content;
  position: relative;
  margin: 1em;
`;

const Text = styled.p`
  width: calc(100% - 2 * 1em);
  font-size: 1rem;
  text-align: center;
`;

const SupportPricingCalculator = () => {
  const [userCount, setUserCount] = useState(1);
  const [price, setPrice] = useState(0);

  const handleSliderChange = (event, value) => {
    event.preventDefault();
    setUserCount(value);
  };

  const handleInputChange = (value) => {
    setUserCount(value === '' ? '' : Number(value));
  };

  const handleBlur = () => {
    if (userCount < 1) setUserCount(1);
    else if (userCount > 100) setUserCount(100);
  };

  useEffect(() => {
    if (userCount < 10) setPrice(userCount * 29.5);
    else setPrice(userCount * 19.5);
  }, [userCount]);

  const marks = [
    { value: 1, label: '1' },
    { value: 100, label: '100' },
  ];

  return (
    <CalculatorContainer>
      <FormWrapper>
        <FormControl id="userCount" aria-label="User count" fullWidth>
          <Slider
            aria-label="User count slider"
            name="userCountSlider"
            valueLabelDisplay="auto"
            value={userCount}
            onChange={handleSliderChange}
            step={1}
            min={1}
            max={100}
            marks={marks}
            track={false}
            sx={{
              // root color
              color: theme.colors.dark,
              // rail (unfilled track)
              '& .MuiSlider-rail': { backgroundColor: theme.colors.dark },
              // thumb
              '& .MuiSlider-thumb': { backgroundColor: theme.colors.brand },
              // tick labels
              '& .MuiSlider-markLabel': {
                opacity: 1,
                color: theme.colors.dark,
              },
              // value label bubble
              '& .MuiSlider-valueLabel': {
                backgroundColor: theme.colors.brand,
                color: theme.colors.darkest,
                '& > span > span': { color: theme.colors.darkest },
              },
            }}
          />

          <Input
            aria-label="User count number input"
            value={userCount}
            onChange={(event) => handleInputChange(event.target.value)}
            onBlur={handleBlur}
            inputProps={{ step: 1, min: 1, max: 100, type: 'number' }}
            fullWidth={false}
            margin="dense"
            sx={{
              width: '4em',
              alignSelf: 'center',
              // underline colors (standard variant)
              '&:before': { borderBottomColor: theme.colors.dark },
              '&:after': { borderBottomColor: theme.colors.dark },
              '&.Mui-focused:after': { borderBottomColor: theme.colors.brand },
            }}
          />
        </FormControl>
      </FormWrapper>

      <Text>
        Tukipalvelun hinta {userCount} käyttäjälle on {price.toFixed(2)} €/kk
      </Text>
    </CalculatorContainer>
  );
};

export default SupportPricingCalculator;
