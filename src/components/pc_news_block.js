
import React from 'react';
import ReactDOM from 'react-dom';
import {Card} from 'antd';
import {Router ,Route , Link , browserHistory} from 'react-router';



class NewsBlock extends React.Component {
	constructor(){
		super();
		this.state={
			news:''
		};
	}

  componentWillMount(){
  	var myFetchOptions ={
      method:'GET'
  	};
    
  	fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.props.count,myFetchOptions)
  	.then(response => response.json())
  	.then(json => this.setState({news:json}));
  	
};
  render () {
    const {news} = this.state;

    const newsList = news.length
    ?
     news.map((newsItem,index)=>(
      <Link to={`details/${newsItem.uniquekey}`} target="_blank" key={index}>
          <li key={index}> {newsItem.title}
          </li>
      </Link>
     	))
    :
     '没有加载任何新闻';

    return (
       <div className="topNewsList">
        <Card>
        	<ul>
        		{newsList}
        	</ul>
        </Card>
       </div>
    );
  }
}

export default NewsBlock;
