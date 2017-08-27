import React from 'react';
import ReactDOM from 'react-dom';
import {Row,Col,Modal} from 'antd';
import {Menu,Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.MenuItemGroup;
import {
	    Tabs,
	    message,
	    Form,
	    Input,
	    Button,
	    Checkbox,
	    Card,
	    notification,
	    Upload
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import {Router,Route,Link,browserHistory} from 'react-router';
import PcHeader from './pc_header';
import PcFooter from './pc_footer';


class UserCenter extends React.Component {

	constructor(){
		super();
		this.state = {
			usercollection:'', //用户收藏
            usercomments:'',   //用户评论
			previewImage:'',   //用户头像图片
			previewVisible:false  //头像是显示
		}
	}


	componentDidMount(){
		var myFetchOption = {
         method:'GET'
       }

       fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+localStorage.userId,myFetchOption)
       .then(response=>response.json())
       .then(json=>{
       	this.setState({usercollection:json});
       });

       fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="+localStorage.userId,myFetchOption)
       .then(response=>response.json())
       .then(json=>{
       	this.setState({usercomments:json});
       });
	}

  render () {
    const props={
    	actions:'http://newsapi.gugujiankong.com/handler.ashx',
    	headers:{
    		"Access-Control-Allow-Origin":"*"
    	},
    	listType:'picture-card',
    	defaultFileList:[
    	{
    		uid:-1,
    		name:'xxx.png',
    		state:'done',
    		url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhb.png',
    		thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhb.png'
    	}],
    	onPreview:(file)=>{
    		this.setState({previewImage:file.url,previewVisible:true});
    	}
    }

    //获取用户收藏新闻List
    const {usercollection,usercomments} = this.state;
    const usercollectionList = usercollection.length ? 
     usercollection.map((uc,index)=>(
     	<Card key={index} title={uc.uniquekey}  extra={ <a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a> } >
     	 <p>{uc.Title}</p>
     	</Card>
     	))
    :
    '尚未收藏任何新闻';

    //获取用户评论List
    const usercommentsList = usercomments.length ?
     usercomments.map((comment,index)=>(
        <Card key={index} title={`您于${comment.datetime} 评论了文章 ${comment.uniquekey}`}  extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a> } >
         <p>{comment.Comments}</p>
        </Card>
     	))
    :
    '您尚未发表任何评论'

    return (
     <div>
        <PcHeader/>
        <Row>
        	<Col span={2}></Col>
        	<Col span={20}>
           <Tabs>
     		<TabPane tab="我的收藏列表" key="1">
     		<div className="comment">
     			<Row>
     				<Col span={24}>
     				{usercollectionList}
     				</Col>
     			</Row>
     		</div>
             
     		</TabPane>
     		<TabPane tab="我的评论列表" key="2">
             <div className="comment">
             	<Row>
             	 <Col span={24}>
             	  {usercommentsList}
             	 </Col>
             	</Row>
             </div>
     		</TabPane>
     		<TabPane tab="头像设置" key="3">
             <div className="clearfix">
             	<Upload {...props}>
          <Icon type="plus"/>
          <div className="ant-upload-text">上传头像</div>
     	 </Upload>
     	 <Modal visible={this.state.previewVisible} footer={null} onCancel={this._handleCancel}>
     	  <img alt="预览" src={this.state.previewImage} />
     	 </Modal>
             </div>
     		</TabPane>
     	   </Tabs>
        	</Col>
        	<Col span={2}></Col>
        </Row>
     	 
     	<PcFooter/>
     </div>
    );
  }
}

export default UserCenter;
