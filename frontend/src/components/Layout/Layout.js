
    import React from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { Switch, Route, useLocation } from 'react-router';
    import { TransitionGroup, CSSTransition } from 'react-transition-group';
    import Hammer from 'rc-hammerjs';
    import Header from '../Header';
    import Helper from '../Helper';
    import Sidebar from '../Sidebar';
    import { openSidebar, closeSidebar, toggleSidebar } from '../../actions/navigation';
    import s from './Layout.module.scss';
    import BreadcrumbHistory from '../BreadcrumbHistory';

    
      import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
      import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';
      import UsersViewPage from 'pages/CRUD/Users/page/UsersViewPage';
    
      import MessagesFormPage from 'pages/CRUD/Messages/form/MessagesFormPage';
      import MessagesTablePage from 'pages/CRUD/Messages/table/MessagesTablePage';
      import MessagesViewPage from 'pages/CRUD/Messages/page/MessagesViewPage';
    
      import Chat_roomsFormPage from 'pages/CRUD/Chat_rooms/form/Chat_roomsFormPage';
      import Chat_roomsTablePage from 'pages/CRUD/Chat_rooms/table/Chat_roomsTablePage';
      import Chat_roomsViewPage from 'pages/CRUD/Chat_rooms/page/Chat_roomsViewPage';
    

    import ChangePasswordFormPage from 'pages/CRUD/ChangePassword/ChangePasswordFormPage';
    import Dashboard from '../../pages/dashboard';
    import { SidebarTypes } from '../../reducers/layout';

    const Layout = () => {
      const sidebarOpened = useSelector((store) => store.navigation.sidebarOpened);
      const sidebarStatic = useSelector((store) => store.navigation.sidebarStatic);
      const dashboardTheme = useSelector((store) => store.layout.dashboardTheme);
      const sidebarType = useSelector((store) => store.layout.sidebarType);

      const dispatch = useDispatch();
      const location = useLocation();

      React.useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

      const handleResize = () => {
        if (window.innerWidth<= 768 && sidebarStatic) {
        dispatch(toggleSidebar(false));
      }
      };

      const handleSwipe = (e) => {
        if ('ontouchstart' in window) {
        if (e.direction === 4) {
        dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && sidebarOpened) {
        dispatch(closeSidebar());
          return;
        }
        }
      };

    return (
    <div
      className={[
        s.root,
        sidebarStatic ? `${s.sidebarStatic}` : '',
        !sidebarOpened ? s.sidebarClose : '',
        'sing-dashboard',
        `dashboard-${sidebarType === SidebarTypes.TRANSPARENT ? 'light' : dashboardTheme}`,
        ].join(' ')}
    >
    <Sidebar/>
    <div className={s.wrap}>
    <Header/>
    <Helper/>
    <Hammer onSwipe={handleSwipe}>
    <main className={s.content}>
    <BreadcrumbHistory url={location.pathname} />
      <Switch>
        <Route path={'/app/dashboard'} exact component={Dashboard} />
        <Route path={'/app/profile'} exact component={UsersFormPage} />
        <Route path={'/app/password'} exact component={ChangePasswordFormPage} />

        
          <Route path={"/admin/users"} exact component={UsersTablePage} />
          <Route path={"/admin/users/new"} exact component={UsersFormPage} />
          <Route path={"/admin/users/:id/edit"} exact
          component={UsersFormPage} />
          <Route path={"/admin/users/:id"} exact component={UsersViewPage} />
        
          <Route path={"/admin/messages"} exact component={MessagesTablePage} />
          <Route path={"/admin/messages/new"} exact component={MessagesFormPage} />
          <Route path={"/admin/messages/:id/edit"} exact
          component={MessagesFormPage} />
          <Route path={"/admin/messages/:id"} exact component={MessagesViewPage} />
        
          <Route path={"/admin/chat_rooms"} exact component={Chat_roomsTablePage} />
          <Route path={"/admin/chat_rooms/new"} exact component={Chat_roomsFormPage} />
          <Route path={"/admin/chat_rooms/:id/edit"} exact
          component={Chat_roomsFormPage} />
          <Route path={"/admin/chat_rooms/:id"} exact component={Chat_roomsViewPage} />
        
      </Switch>
  <footer className={s.contentFooter}>
  mr messenger - Made by
  <a href="https://flatlogic.com" rel="nofollow noopener noreferrer" target="_blank">Flatlogic</a>
</footer>
  </main>
  </Hammer>
  </div>
  </div>
  );
  };

  export default Layout;
  
