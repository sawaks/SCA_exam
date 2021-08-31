import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';

/**
 * This is a custom NavLink implementation as Next.js does not provide one
 * out of the box. It sets the active link state based on the following:
 * 1. If exact is true it will match the asPath.
 * 2. If exact is false it will determine if href pathname is part
 * of the the route pathname.
 */
function NavLink({ router, children, href, as, exact, disabled = false, ...props }) {
  // Retrieve child and child classname
  const child = Children.only(children);
  const isActive = router.asPath === href;

  return (disabled
    ? <>{React.cloneElement(child)}</>
    : <Link {...{ href, ...props }}>{React.cloneElement(child, { isActive })}</Link>
  );
}

NavLink.propTypes = {
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    asPath: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  href: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  exact: PropTypes.bool,
  as: PropTypes.string,
  disabled: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
  as: '',
  disabled: false,
};

export default withRouter(NavLink);
