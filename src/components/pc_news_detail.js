import React from 'react';
import {Row,Col,BackTop} from 'antd';
import PcHeader from './pc_header';
import PcFooter from './pc_footer';
import NewsImageBlock from './pc_news_image_block';
import Comments from './pc_comments';


class NewsDetails extends React.Component {

	constructor(){
		super();
		this.state={
			newsItem:''
		}
	}


	componentDidMount(){
		var myFetchOptions={
			method:'GET'
		}

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.params.uniquekey,myFetchOptions)  // !!!!!!!!!!!this.props.params.uniquekey从哪里传过来？!!!!!!!!!!!!
		.then(response=>response.json())
		.then(json=>{
			this.setState({newsItem:json});
			document.title=this.state.newsItem.title+" - React News | React 驱动的新闻平台";
		})
	}

	createMarkup(){
		return {__html:this.state.newsItem.pagecontent}
	}

  render () {
    return (
     <div>
       <PcHeader/>
     	<Row>
     		<Col span={2}></Col>
     		<Col span={14} className="container">
             <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
             <hr/>
             <Comments uniquekey={this.props.params.uniquekey}/>
     		</Col>
     		<Col span={6}>
             <NewsImageBlock count={40} type="top" width="100%" cardTitle="相关新闻" imageWidth="150px" />
     		</Col>
     		<Col span={2}></Col>
     	</Row>
     	<PcFooter/>
     	<BackTop/>
     </div>
    );
  }
}

export default NewsDetails;