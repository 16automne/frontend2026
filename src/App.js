import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import Main from './component/Main'

import Goods from './component/Goods';
import GoodsCreate from './component/GoodsCreate';
import GoodsUpdate from './component/GoodsUpdate';

import Fruits from './component/Fruits';
import FruitsCreate from './component/FruitsCreate';
import FruitsUpdate from './component/FruitsUpdate';

import BookStore from './component/BookStore';
import BookStoreCreate from './component/BookStoreCreate';
import BookStoreUpdate from './component/BookStoreUpdate';

import Noodle from './component/Noodle';
import NoodleCreate from './component/NoodleCreate';
import NoodleUpdate from './component/NoodleUpdate';

import ContactUs from './component/ContactUs';

import Login from './component/Login'
import Join from './component/Join'

import { AlertProvider, AlertContext } from './AlertContext'

function AppContent() {
  //1. 숫자 알림 카운트
  const { questionCount } = React.useContext(AlertContext);
  const { fruitsCount } = React.useContext(AlertContext);
  const { goodsCount } = React.useContext(AlertContext);
  //2. 숫자 배지 스타일 서식
  const badgeStyle = {
    display: 'inline-block',
    marginLeft: 1,
    background: 'red',
    color: 'white',
    borderRadius: '50%',
    width: 20, height: 20,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: '22px',
    fontWeight: 'bold',
    position: 'absolute'
  }

  return (
    <>
      <BrowserRouter>
        <header>
          <h1>Frontend(React) + BAckend(MySQL) Setting, DB데이터 입/출력, 삭제, 수정</h1>
          <nav className='hNavi'>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/goods'>
                Goods
                {questionCount > 0 && (
                  <span style={badgeStyle}>
                    {goodsCount}
                  </span>
                )}
              </Link></li>
              <li><Link to='/fruits'>
                fruits
                {questionCount > 0 && (
                  <span style={badgeStyle}>
                    {fruitsCount}
                  </span>
                )}
              </Link></li>
              <li><Link to='/bookstore'>
                BookStore
                {/* {questionCount > 0 && (
                  <span style={badgeStyle}>
                    { bookStoreCount}
                  </span>
                )} */}
              </Link></li>
              <li><Link to='/noodle'>
                Noodle
                {/* {questionCount > 0 && (
                  <span style={badgeStyle}>
                    {noodleCount}
                  </span>
                )} */}
              </Link></li>
              <Link to='/contactus'>
                Contact Us
                {questionCount > 0 && (
                  <span style={badgeStyle}>
                    {questionCount}
                  </span>
                )}
              </Link>

              <li><Link to='/login'>
                Login
                {/* {questionCount > 0 && (
                  <span style={badgeStyle}>
                    {loginCount}
                  </span>
                )} */}
              </Link></li>
              <li><Link to='/join'>Join</Link></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Main />} />

          <Route path='/goods' element={<Goods />} />
          <Route path='/goodscreate' element={<GoodsCreate />} />
          <Route path='/goods/update/:g_code' element={<GoodsUpdate />} />

          <Route path='/fruits' element={<Fruits />} />
          <Route path='/fruits/fruitscreate' element={<FruitsCreate />} /> 
          <Route path='/fruits/fruitsupdate/:num' element={<FruitsUpdate />} />

          <Route path='/bookstore' element={<BookStore />} />
          <Route path="/bookstore/bookstorecreate" element={<BookStoreCreate />} />
          <Route path="/bookstore/bookstoreupdate/:code" element={<BookStoreUpdate />} />

          <Route path='/noodle' element={<Noodle />} />
          <Route path='/noodle/noodlecreate' element={<NoodleCreate />} />
          <Route path='/noodle/noodleupdate/:num' element={<NoodleUpdate />} />

          <Route path='/contactus' element={<ContactUs />} />

          {/* path주소에 적힌 주소명이 url주소뒤에 붙는 이름, 불러올 콤포넌트 명은 element에 작성 */}
          <Route path='/join' element={<Join />} />
          <Route path='/login' element={<Login />} />
        </Routes>

        <footer>
          <address>Copyright&copy;2025 React Frontend_Backend + MySQL allrights reserved.</address>
        </footer>
      </BrowserRouter>
    </>
  );
}

function App(){
  return(
    <AlertProvider>
      <AppContent />
    </AlertProvider>
  );
}
export default App;
