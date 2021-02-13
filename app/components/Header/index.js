/**
 *
 * Header
 *
 */

import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { fonts } from '@themes';
import T from '@components/T';
import logo from '@images/icon-64.png';
const StyledHeader = styled(Layout.Header)`
  && {
    &.ant-layout-header {
      padding: 0 1rem;
      height: 5rem;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fafafa;
  }
`;
const Logo = styled.img`
  height: 2rem;
  width: auto;
  margin-right: 0.8rem;
`;
const Title = styled(T)`
  && {
    margin-bottom: 0;
    ${fonts.dynamicFontSize(fonts.size.xRegular, 1, 0.5)};
    display: flex;
    align-self: center;
  }
`;
function Header(props) {
  return (
    <StyledHeader {...props} data-testid="header">
      <Logo alt="logo" src={logo} />
      <Title type="heading" id="itunes" />
    </StyledHeader>
  );
}

export default injectIntl(Header);
