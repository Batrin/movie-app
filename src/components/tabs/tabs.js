import React from 'react';
import PropTypes from 'prop-types';
import './tabs.css';

function Tabs({ onTabClick, currentTab }) {
  let tabClassNames = 'tabs ';

  tabClassNames += currentTab;

  return (
    <div className={tabClassNames}>
      <button name="search" type="button" className="tab tab-search" onClick={onTabClick}>
        Search
      </button>
      <button name="rated" type="button" className="tab tab-rated" onClick={onTabClick}>
        Rated
      </button>
    </div>
  );
}

Tabs.propTypes = {
  onTabClick: PropTypes.func,
  currentTab: PropTypes.string,
};

export default Tabs;
