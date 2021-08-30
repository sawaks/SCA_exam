import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from 'components/Grid';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import TabLink from './TabLink';

const WrappedTabs = styled(Flex)`
  display: block;
  flex-direction: column;
  justify-content: flex-start;
  letter-spacing: normal;
  transition: top 0.3s;
`;

const TabsHeader = styled.div`
  display: flex;
  flex-wrap: nowrap;
  text-decoration: none;
  overflow: visible;
  position: relative;
  margin-top: ${spacing.m};
  font-weight: 600;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  height: 72px;

  ${screen.md} {
    height: 34px;
  }
`;

const TabsContent = styled.div`
  display: block;
  padding-top: ${props => (props.paddingTop ? spacing[props.paddingTop] : spacing.m)};
  margin-top: ${props => (props.marginTop ? spacing[props.marginTop] : spacing.m)};
  ${screen.md} {
    margin-top: ${spacing.s};
  }
`;

const StyledTabBorder = styled.div`
  display: none;
  position: absolute;
  z-index: -1;
  border-radius: 60px;
  border-style: solid;
  border-width: 3px;
  border-color: transparent;
  transition: left 0.5s cubic-bezier(0, 0, 0.58, 1), width 0.5s cubic-bezier(0, 0, 0.58, 1);
  height: 34px;
  padding: 2px;
  /*
  width: ${props => (props.width - 12)}px;
  left: ${props => (props.left + 6)}px;
  top: ${props => props.top - 4}px;
  */
  width: ${props => (props.width - 8)}px;
  left: ${props => (props.left)}px;
  top: ${props => props.top - 5}px;
`;

const StyledTabRow = styled(Flex)`
  width: 100%;
  min-height: 30px;
  height: 80px;
  ${screen.md} {
    height: 34px;
  }
`;

const StyledActionBar = styled.span`
  height: 30px;
`;

class Tabs extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: props.selected,
      borderWidth: props.initialWidth || 0,
      borderLeft: props.secondaryWidth,
    };

    // create ref for the buttons
    // use x.text to filter the tab header, use x.for to filter the tab content
    const tabsCount = props.children.filter(x => x.props.text).length;
    // Array.fill doesn't work for creating init values.
    this.headRefs = new Array(tabsCount);
    for (let i = 0; i < tabsCount; i += 1) {
      this.headRefs[i] = React.createRef();
    }
  }

  getHeader(tabs, rightSideComponents) {
    return (
      <StyledTabRow justifyContent="space-between" alignItems="center">
        <Flex flexWrap="wrap" alignItems="center">
          {tabs.map((tab, idx) => (
            <span ref={this.headRefs[idx]} key={tab.props.text}>
              <TabLink
                key={tab.props.text}
                text={tab.props.text}
                hide={tab.props.hide}
                isActive={this.isSelected(tab)}
                onClick={e => this.selectTab(e, tab.props.text)}
                href={tab.props.href}
              />
            </span>
          ))}
        </Flex>
        { rightSideComponents && (
        <StyledActionBar>
          {
            rightSideComponents.map(item => React.cloneElement(item, {
              key: item.props.name,
            }))
          }
        </StyledActionBar>
        )}
      </StyledTabRow>
    );
  }

  animateBorder(selected) {
    const tabHeaders = this.props.children.filter(x => x.props.text);
    const idx = tabHeaders.map(x => x.props.text).indexOf(selected);
    const headRef = this.headRefs[idx];
    const { clientWidth, offsetLeft, offsetTop } = headRef.current;
    this.setState({ borderWidth: clientWidth, borderLeft: offsetLeft, borderTop: offsetTop });
  }

  isSelected(tab) {
    return tab.props.text === this.state.selected;
  }

  selectTab(e, selected) {
    this.setState({ selected });
    this.props.onChange(e, selected);
  }

  render() {
    const { marginTop, paddingTop } = this.props;
    const tabs = this.props.children;
    const tabHeaders = tabs.filter(x => x.props.text);
    const tabContents = tabs.filter(x => x.props.for);
    const { borderWidth, borderLeft, borderTop } = this.state;
    const rightSideComponents = this.props.children.filter(x => x.props.label === 'rightSideNav');

    return (
      <WrappedTabs justifyContent="space-between" alignItems="center">
        <TabsHeader>
          <StyledTabBorder width={borderWidth} left={borderLeft} top={borderTop} />
          {this.getHeader(tabHeaders, rightSideComponents)}
        </TabsHeader>
        <TabsContent marginTop={marginTop} paddingTop={paddingTop}>
          {
            tabContents.map(item => React.cloneElement(item, {
              isActive: item.props.for === this.state.selected,
              key: item.props.for,
              hide: item.props.hide,
            }))
          }
        </TabsContent>
      </WrappedTabs>
    );
  }
}

Tabs.propTypes = {
  selected: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  onChange: PropTypes.func,
  marginTop: PropTypes.string,
  paddingTop: PropTypes.string,
  initialWidth: PropTypes.number,
  secondaryWidth: PropTypes.number,
};

Tabs.defaultProps = {
  onChange: () => {},
  marginTop: null,
  paddingTop: null,
  initialWidth: 0,
  secondaryWidth: 0,
};

export default Tabs;
