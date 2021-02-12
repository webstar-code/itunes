import styled from 'styled-components';
import {Typography, Card } from 'antd';
import { colors } from '@themes'
const { Title} = Typography;

export const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: ${props => props.maxWidth}px;
    width: 100%;
    margin: 0px auto;
    background: ${props => props.theme.fg};
    padding: ${props => props.padding}px;
  }
`;

export const CustomTitle = styled(Title)`
  && {
    font-size: 48px;
    margin: 0;
    text-transform: uppercase;
  }
`;

export const CustomCard = styled(Card)`
    width: 100%;
    max-width: 100%;
    color: ${props => props.theme.text} !important;
    background: ${props => props.theme.bg};
`;

export const Item = styled.div`
    && {
      width: 100%;
      max-width: 100%;
      color: ${props => props.theme.text} !important;
    }
`;

export const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;