import styled from 'styled-components';
import { Card, Skeleton, Typography, Input } from 'antd';

const { Title, Text } = Typography

export const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: ${props => props.maxWidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;

export const CustomTitle = styled(Title)`
  && {
    font-size: 48px;
    text-transform: uppercase;
  }
`;

export const CustomCard = styled(Card)`
  && {
    width: 100%;
    margin: 20px 0;
    max-width: 100%;
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;


export const CustomItemCard = styled(Card)`
  && {
    width: 100%;
    display: flex;
    margin: 20px 0;
    padding: 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;

export const MetaTitle = styled(Text)`
&& {
  width: calc(100% - 60px);
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




