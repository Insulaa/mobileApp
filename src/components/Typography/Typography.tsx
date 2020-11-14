import {Typography as MUITypography} from '@material-ui/core';
import React from 'react';
import {Variant} from '@material-ui/core/styles/createTypography';
import cx from 'classnames';

type CustomVariant =
  | 'h1'
  | 'h1-bold'
  | 'h2'
  | 'h2-bold'
  | 'h3'
  | 'h3-bold'
  | 'b1'
  | 'b1-bold'
  | 'b2'
  | 'b2-bold'
  | 'b3'
  | 'b3-bold'
  | 'b3-bold-upper'
  | 'b3-bold-upper-gray';

type TypographyProps = {
  children: NonNullable<React.ReactNode>;
  variant: CustomVariant;
  truncate?: boolean;
};

const Typography = (props: TypographyProps) => {
  const variantMapping = new Map<CustomVariant, Variant>([
    ['h1', 'h1'],
    ['h1-bold', 'h1'],
    ['h2', 'h2'],
    ['h2-bold', 'h2'],
    ['h3', 'h3'],
    ['h3-bold', 'h3'],
    ['b1', 'body1'],
    ['b1-bold', 'body1'],
    ['b2', 'body2'],
    ['b2-bold', 'body2'],
    ['b3', 'caption'],
    ['b3-bold', 'caption'],
    ['b3-bold-upper', 'caption'],
  ]);

  const bold = props.variant.includes('bold');
  const upper = props.variant.includes('upper');

  return (
    <MUITypography variant={variantMapping.get(props.variant)}>
      {props.children}
    </MUITypography>
  );
};

export default Typography;
