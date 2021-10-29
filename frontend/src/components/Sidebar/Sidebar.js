
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import s from './Sidebar.module.scss';
import LinksGroup from './LinksGroup/LinksGroup';
import { openSidebar, closeSidebar, changeActiveSidebarItem } from '../../actions/navigation';
import isScreen from '../../core/screenHelper';
import { logoutUser } from 'actions/auth';

import classnames from "classnames";

import s2 from './LinksGroup/LinksGroup.module.scss';

const Sidebar = (props) => {
  const {
    sidebarStatic = false,
    sidebarOpened = false,
    dispatch,
    activeItem = '',
    location,
    currentUser
  } = props;

  const onMouseEnter = () => {
    if (!sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
      const paths = location.pathname.split('/');
      paths.pop();
      dispatch(openSidebar());
      dispatch(changeActiveSidebarItem(paths.join('/')));
    }
  }

  const onMouseLeave = () => {
    if (!sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
      dispatch(closeSidebar());
      dispatch(changeActiveSidebarItem(null));
    }
  }

  const doLogout = () => {
    dispatch(logoutUser());
  }

    return (
      <div className={`${(!sidebarOpened && !sidebarStatic ) ? s.sidebarClose : ''} ${s.sidebarWrapper}`}>
        <nav
          onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
          className={s.root}
        >
          <header className={s.logo}>
            <a href="/"><span className={`${s.logoStyle} mx-1`}>mr messenger</span></a>
          </header>
          <ul className={s.nav}>

          <LinksGroup
            onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={activeItem}
            header="Dashboard"
            link="/app/dashboard"
            isHeader
            iconName="la-home"
          />


          {currentUser && currentUser.role === 'admin' &&
            <LinksGroup
              onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Users"
              link="/admin/users"
              isHeader
              iconName="la-users"
            />
          }

          {currentUser && currentUser.role === 'admin' &&
            <LinksGroup
              onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Messages"
              link="/admin/messages"
              isHeader
              iconName="la-users"
            />
          }

          {currentUser && currentUser.role === 'admin' &&
            <LinksGroup
              onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Chat_rooms"
              link="/admin/chat_rooms"
              isHeader
              iconName="la-users"
            />
          }


            <LinksGroup
              onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="My Profile"
              link="/app/profile"
              isHeader
              iconName="la-user"
            />

            <LinksGroup
              onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
              activeItem={activeItem}
              header="Change Password"
              link="/app/password"
              isHeader
              iconName="la-key"
            />

          <LinksGroup
            onActiveSidebarItemChange={activeItem => dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={activeItem}
            header="Documentation"
            link="/documentation"
            isHeader
            iconName="la-book"
            index="documentation"
            labelColor="success"
            target="_blank"
          />

          <li className={classnames('link-wrapper', s2.headerLink)}>
          <a
          target={"_blank"}
          href={process.env.NODE_ENV === 'production' ? window.location.origin + '/api-docs' : 'http://localhost:8080/api-docs'}
          >
          <span className={classnames('icon', s2.icon)}>
          <i className={`la la-book`} />
          </span>
          Swagger
          </a>
          </li>

          </ul>
        </nav >
      </div>
    );
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    activeItem: store.navigation.activeItem,
    currentUser: store.auth.currentUser,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
