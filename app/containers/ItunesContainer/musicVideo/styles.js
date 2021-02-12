import styled from 'styled-components';
import { styles } from '@themes';

import { Card, Typography } from 'antd';

const { Text } = Typography;

export const CustomCard = styled(Card)`
  && {
    width: 100%;
    max-width: 100%;
    background: ${props => props.theme.bg};
    color: ${props => props.color === "true" ? '#fa233b' : props.theme.text};
  }
`;

export const CustomItemCard = styled(Card)`
  && {
      display: flex;
      flex-direction: column;
      margin: 10px;
      padding: 0;
      background: ${props => props.theme.bg};
      color: ${props => props.theme.text};
      max-width: ${props => props.maxwidth};
      border-color: ${props => props.theme.text}75;
      cursor: pointer;
      &:hover {
        box-shadow:  0 6px 12px -4px #fa233b80;
      }
  }
`;

export const MetaTitle = styled(Text)`
  && {
    color: ${props => props.theme.text};
    ${styles.textEllipsis('100%')};
    margin-bottom: 2px;
    font-weight: 700;
  }
`;
export const MetaDescription = styled(Text)`
  && {
    color: ${props => props.theme.text}75;
    ${styles.textEllipsis('100%')};
    font-size: 12px;
  }
`;

export const Meta = styled.div`
  && {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
