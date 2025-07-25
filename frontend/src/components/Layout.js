import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import $ from 'jquery';

const Layout = () => {
  useEffect(() => {
    document.body.classList.add('hold-transition', 'sidebar-mini', 'layout-fixed');

    setTimeout(() => {
      $('[data-widget="pushmenu"]').trigger('click');
    }, 0);
    

    return () => {
      document.body.classList.remove('hold-transition', 'sidebar-mini', 'layout-fixed');
    };
  }, []);

  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content p-3">
          <Outlet />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
