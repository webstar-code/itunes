import styled from 'styled-components';
import { Card } from 'antd';

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

export const CustomCard = styled(Card)`
  && {
    .ant-tabs-tab-btn {
      color: ${props => props.theme.text};
    }
    width: 100%;
    max-width: 100%;
    background: ${props => props.theme.bg};
  }
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
