import styled from 'styled-components';
import { Card, Typography } from 'antd';
import { styles, fonts } from '@themes';

const { Text } = Typography;

export const CustomCard = styled(Card)`
  && {
    width: 100%;
    max-width: 100%;
    background: ${props => props.theme.bg};
    color: ${props => (props.color === 'true' ? '#fa233b' : props.theme.text)};
  }
`;

export const CustomItemCard = styled(Card)`
  && {
    display: flex;
    margin: 20px 0px;
    padding: 0;
    background: ${props => props.theme.bg};
    max-width: ${props => props.maxwidth};
    border-color: ${props => props.theme.text}75;
    &:hover {
      box-shadow: 0px 3px 6px -2px #fa233b80;
    }
  }
`;

export const MetaTitle = styled(Text)`
  && {
    ${styles.textEllipsis('calc(100% - 60px)')};
    margin-bottom: 2px;
    font-size: 14px;
    ${fonts.weights.bold()};
    color: ${props => props.theme.text};
  }
`;
export const MetaDescription = styled(Text)`
  && {
    ${styles.textEllipsis('calc(100% - 60px)')};
    color: ${props => props.theme.text}75;
    font-size: 12px;
    ${fonts.weights.light()};
  }
`;
export const Meta = styled.div`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
