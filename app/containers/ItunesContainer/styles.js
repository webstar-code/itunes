import styled from 'styled-components';
import {Typography } from 'antd';

const { Title} = Typography;


export const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: ${props => props.maxWidth}px;
    width: 100%;
    margin: 0px auto;
    padding: ${props => props.padding}px;
  }
`;

export const CustomTitle = styled(Title)`
  && {
    font-size: 48px;
    text-transform: uppercase;
  }
`;
