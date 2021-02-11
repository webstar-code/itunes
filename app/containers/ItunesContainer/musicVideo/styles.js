import styled from 'styled-components';
import { Card, Typography } from 'antd';

const { Text } = Typography;

export const CustomCard = styled(Card)`
  && {
    width: 100%;
    max-width: 100%;
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;


export const CustomItemCard = styled(Card)`
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
`;

export const MetaTitle = styled(Text)`
  && {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 2px;
    font-weight: 700;
  }
`;
export const MetaDescription = styled(Text)`
  font-size: 12px;
`;
export const Meta = styled(Text)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
