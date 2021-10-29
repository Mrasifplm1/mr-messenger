import React from 'react';
import cx from 'classnames';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarTypes, NavbarTypes } from '../../reducers/layout';
import {
  changeTheme,
  changeSidebarColor,
  changeNavbarColor,
  navbarTypeToggle,
  sidebarTypeToggle,
} from '../../actions/layout';
import CustomColorPicker from '../ColorPicker';
import config from '../../config';

import Widget from '../Widget';

import s from './Helper.module.scss'; // eslint-disable-line

const Helper = () => {
  const [isOpened, setIsOpened] = React.useState(false);

  const dispatch = useDispatch();

  const sidebarColor = useSelector((store) => store.layout.sidebarColor);
  const navbarColor = useSelector((store) => store.layout.navbarColor);
  const navbarType = useSelector((store) => store.layout.navbarType);
  const sidebarType = useSelector((store) => store.layout.sidebarType);

  const toggle = () => {
    setIsOpened((prevState) => !prevState);
  };

  const handleChangeTheme = (state) => {
    dispatch(changeTheme(state));
    dispatch(changeSidebarColor(state));
  };

  const navbarStateToggle = (state) => {
    dispatch(navbarTypeToggle(state));
  };

  const sidebarStateToggle = (state) => {
    dispatch(sidebarTypeToggle(state));
  };

  const updateColor = (value) => {
    dispatch(changeNavbarColor(value));
  };

  return (
    <div className={cx(s.themeHelper, { [s.themeHelperOpened]: isOpened })}>
      <div className={`${s.themeHelperBtn} bg-primary helper-button`} onClick={toggle}>
        <div className={cx(s.themeHelperSpinner, 'text-white')}>
          <i className="la la-cog" />
          <i className="la la-cog" />
        </div>
      </div>
      <Widget className={s.themeHelperContent}>
        <div className={s.helperHeader}>
          <h5 className="m-0">Theme Customizer</h5>
        </div>

        <div className="theme-settings">
          <h5 className="navbar-type-switcher">Navbar Type</h5>
          <div className="form-group row">
            <div className="abc-radio">
              <input
                onChange={() => navbarStateToggle(NavbarTypes.STATIC)}
                type="radio"
                checked={navbarType === NavbarTypes.STATIC ? true : ''}
                name="navbar-type"
                id="navbar_static"
              />
              <label htmlFor="navbar_static">Static</label>
            </div>

            <div className="abc-radio">
              <input
                onChange={() => navbarStateToggle(NavbarTypes.FLOATING)}
                type="radio"
                checked={navbarType === NavbarTypes.FLOATING ? true : ''}
                name="navbar-type"
                id="navbar_floating"
              />
              <label htmlFor="navbar_floating">Floating</label>
            </div>
          </div>

          <h5 className="mt-4 navbar-color-picker">Navbar Color</h5>
          <CustomColorPicker
            colors={config.app.colors}
            activeColor={navbarColor}
            updateColor={updateColor}
            customizationItem={'navbar'}
          />

          <h5 className="mt-4 sidebar-type-switcher">Sidebar Type</h5>
          <div className="form-group row">
            <div className="abc-radio">
              <input
                type="radio"
                onChange={() => sidebarStateToggle(SidebarTypes.TRANSPARENT)}
                checked={sidebarType === SidebarTypes.TRANSPARENT ? true : ''}
                name="sidebar-type"
                id="sidebar_transparent"
              />
              <label htmlFor="sidebar_transparent">Transparent</label>
            </div>

            <div className="abc-radio">
              <input
                type="radio"
                onChange={() => sidebarStateToggle(SidebarTypes.SOLID)}
                checked={sidebarType === SidebarTypes.SOLID ? true : ''}
                name="sidebar-type"
                id="sidebar_solid"
              />
              <label htmlFor="sidebar_solid">Solid</label>
            </div>
          </div>

          <h5 className="mt-4 sidebar-color-picker">Sidebar Color</h5>
          <CustomColorPicker
            colors={config.app.colors}
            activeColor={sidebarColor}
            updateColor={handleChangeTheme}
            customizationItem={'sidebar'}
          />
        </div>
        <div className="mt-5">
          <Button
            href="https://flatlogic.com/admin-dashboards/sing-app-react"
            target="_blank"
            className="btn-rounded-f btn-block fs-mini purchase-button"
            color="info"
          >
            <span className="text-white">Purchase</span>
          </Button>
          <Button
            href="http://demo.flatlogic.com/sing-app/documentation/"
            target="_blank"
            className="btn-rounded-f btn-block fs-mini text-white"
            color="primary"
          >
            Documentation
          </Button>
        </div>
        <div className="d-flex justify-content-between mt-lg">
          <Button
            href="https://flatlogic.com/contact"
            target="_blank"
            className="btn-outline-default btn-rounded-f fs-mini text-muted px-2"
          >
            <i className="glyphicon glyphicon-headphones mr-xs" />
            Support
          </Button>
          <Button
            href="https://github.com/flatlogic/sing-app"
            target="_blank"
            className="btn-outline-default btn-rounded-f fs-mini text-muted px-2"
          >
            <i className="fa fa-github mr-xs" />
            Github
          </Button>
        </div>
        <div className="mt-lg d-flex flex-column align-items-center theme-helper__sharing">
          <span className="fs-sm">Thank you for sharing!</span>
          <div className="d-flex justify-content-center text-light mt-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/intent/tweet?text=Amazing%20dashboard%20built%20with%20NodeJS,%20React%20and%20Bootstrap!&url=https://github.com/flatlogic/react-dashboard&via=flatlogic"
            >
              <i className="fa fa-twitter pr-1" />
            </a>
            <a
              href="https://www.facebook.com/search/top/?q=flatlogic%20llc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-facebook pl-1" />
            </a>
          </div>
        </div>
      </Widget>
    </div>
  );
};

export default Helper;
