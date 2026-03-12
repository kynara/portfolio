import React from 'react';
import { AwesomeButton } from '@rcaferati/react-awesome-button';
import '@rcaferati/react-awesome-button/styles.css';

interface AwesomeBtnProps {
  children: React.ReactNode;
  /** Main face colour — use a token hex value */
  color: string;
  /** Shadow / depth colour — darker shade of color */
  dark: string;
  /** Label text colour — defaults to white */
  textColor?: string;
  onPress?: () => void;
  /** 'small' for back/secondary actions, omit for full-size */
  size?: string;
}

const AwesomeBtn: React.FC<AwesomeBtnProps> = ({
  children,
  color,
  dark,
  textColor = '#ffffff',
  onPress,
  size,
}) => (
  <AwesomeButton
    type="primary"
    size={size}
    onPress={onPress}
    style={{
      '--button-primary-color':        color,
      '--button-primary-color-dark':   dark,
      '--button-primary-color-light':  textColor,
      '--button-primary-color-hover':  color,
      '--button-primary-color-active': dark,
      '--button-font-family':   "'SuperCereal', 'SuperFoods', sans-serif",
      '--button-font-weight':   '400',
      '--button-default-height': '52px',
      '--button-default-font-size': '1rem',
      '--button-default-border-radius': '10px',
      '--button-raise-level': '5px',
      '--button-horizontal-padding': '32px',
    } as React.CSSProperties}
  >
    {children}
  </AwesomeButton>
);

export default AwesomeBtn;
