import React from 'react';
import { Text } from 'react-native';

interface FormattedNumberProps {
  value: number;
}

const FormattedNumber: React.FC<FormattedNumberProps> = ({ value }) => {
  const formatNumber = (num: number) => {
    if (num >= 1e18) {
      return (num / 1e18).toFixed(2).replace(/\.0$/, '') + ' Trillion Trillion';
    } else if (num >= 1e15) {
      return (num / 1e15).toFixed(2).replace(/\.0$/, '') + ' Billion Trillion';
    } else if (num >= 1e12) {
      return (num / 1e12).toFixed(2).replace(/\.0$/, '') + ' Trillion';
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(2).replace(/\.0$/, '') + ' Billion';
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2).replace(/\.0$/, '') + ' Million';
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2).replace(/\.0$/, '') + ' Thousand';
    } else {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  return (
    <Text>{formatNumber(value)}</Text>
  );
};

export default FormattedNumber;