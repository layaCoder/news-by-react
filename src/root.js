//旧版本写法

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import {Link} from 'react-router';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import PcIndex from './components/pc_index.js';
import PcFooter from './components/pc_footer';
import UserCenter from './components/pc_usercenter';

import NewsDetails from './components/pc_news_detail';
import './styles/pc.css';



class Root extends React.Component {

  render () {
    return (
      //这里替换之前的Index.js，变成程序的入口
      //<Router history={hashHistory}>
       <div>
         <Router history={hashHistory}>
          <Route path="/" component={PcIndex}></Route>
          <Route path="/details/:uniquekey" component={NewsDetails}></Route>
          <Route path="/usercenter" component={UserCenter}></Route>
         </Router>
       </div>

      //</Router>
    );
  }
}

export default Root;
ReactDOM.render(<Root />, document.getElementById('mainContainer'));





//react-router 4.0后写法
/*
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Main from './components/Main';
import ComponentList from './components/List';

ReactDOM.render((
     <BrowserRouter>
          <div>
          <Route path="/" component={Main}/>
          <Route path="list" component={ComponentList}/>
          </div>
     </BrowserRouter>
     ),
     document.getElementById('content')
);
*/