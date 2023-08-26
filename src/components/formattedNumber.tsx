import React from 'react';

interface FormattedNumberProps {
  value: number;
}

const FormattedNumber: React.FC<FormattedNumberProps> = ({ value }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2).replace(/\.0$/, '') + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2).replace(/\.0$/, '') + 'K';
    } else {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  return (
    <>{formatNumber(value)}</>
  );
};

export default FormattedNumber;