
import React from 'react';
import ReactDOM from 'react-dom';
import {Router ,Route , Link , browserHistory} from 'react-router';

import { Row,Col} from 'antd';
import { Menu,Icon, Tabs, message, Form, Input, Button, CheckBox ,Modal } from 'antd';


const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

//获取图片数据json
var imageDatas = require('../data/logoDatas.json');


//将图片JSON文件转换成图片URL数组
function genImageURL(imageDatasArr) {
    for (var i = 0; i < imageDatasArr.length; i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
}

imageDatas = genImageURL(imageDatas);


class PcHeader extends React.Component {

   constructor(){
   	super();
   	this.state = {
   		current: 'top',
   		modalVisible: false, 
   		action : 'login',
   		hasLogined: false,
   		userNickName: '',
   		userid : 0
   	}
   }

  componentWillMount(){
  	if(localStorage.userId!=''){
  		this.setState({hasLogined:true});
  		this.setState({userNickName : localStorage.userNickName , userid:localStorage.userId});
  	}
  }
  
  //页面开始向API进行提交数据
  _handleSubmit(e){
   
  	//阻止事件冒泡
   e.preventDefault();
    
   //定义fetch请求的设置
   var myFetchOptions={
   	method: 'GET'
   };

   //将注册信息通过fetch请求到后台
   var formData=this.props.form.getFieldsValue();
   console.log(formData);
   fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
   	+"&username="+formData.userName
   	+"&password="+formData.password
   	+"&r_userName="+formData.r_userName
   	+"&r_password="+formData.r_password
   	+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).  
    then(response=>response.json()).then(json=>{    //获取相应数据格式化为json，通过json数据重新给state赋值
    this.setState({userNickName : json.NickUserName, userid: json.UserId});
    localStorage.userNickName = json.NickUserName;
    localStorage.userId= json.UserId;
   });

    if(this.state.action=="login"){  //如果是登录action，且成功登录，设置state中的hasLogined状态为true，显示【个人中心】，及【退出】按钮
    	this.setState({hasLogined:true});
        
    } 
    //成功后弹窗
    message.success("请求成功！");	
    //隐藏注册窗体
    this._setModalVisible(false);
  }
  
  //设置登录注册弹窗是否可见
  _setModalVisible(value){
  	this.setState({modalVisible:value})
  }
   

   //点击选择新闻类别
   _handleItemClick(item,key,keyPath){
    //如果 item 为用户注册/登录，则显示登录窗体
    if(item.key=="register"){
    	this.setState({modalVisible:! this.state.modalVisible, current:'register'})
    }
    else{
    	console.log(item,item.key);
    this.setState({ current: item.key} )
    }
    
   };


   _tabCallBack(key){
   	if(key==1){
      this.setState({action: 'login'});
   	}
   	else if(key==2){
   		this.setState({action: 'register'});
   	}
   }


   _handleLogoutButton(e){
   	this.setState({userName:'' , userid: ''})
   	this.setState({hasLogined:false})
   }


   
  render () {
    
    const { getFieldDecorator }= this.props.form;
    const userShow = this.state.hasLogined 
    ? 
    <Menu.Item key="logout" className="register" >  
     <Button type="primary" htmlType="button" >{this.state.userNickName}</Button>  
     &nbsp;&nbsp; 
     <Link target="_blank" to={`/usercenter`}>
     <Button type="dashed" htmlType="button">个人中心</Button>
     </Link>
     &nbsp;&nbsp;
     <Button type="ghost" htmlType="button" onClick={this._handleLogoutButton.bind(this)} >退出</Button>
    </Menu.Item>
    :
    <Menu.Item key="register" className="register" >
        <Icon type="appstore"/>注册/登录
    </Menu.Item>

   //------------加载头部logo图片------------------
    const logoImage = imageDatas.length
    ?
     imageDatas.map((logoImage,index)=>(
      <img src={logoImage.imageURL} alt="logo" key={index} />
      ))
    :
    "没有加载任何图片"  
 
   //------------加载头部logo图片------------------

   
    return (
      <header>
      	<Row>
      		<Col span={2}></Col>
      		<Col span={4}>
      		 <a href="/" className="logo">
            {logoImage}
      		  <span>ReactNews</span>
      		 </a>
      		</Col>
      		 <Col span={16}>
              <Menu mode="horizontal" selectedKeys={[this.state.current]}  onClick={this._handleItemClick.bind(this)}>
              	<Menu.Item key="top" >
              	<Icon type = "appstore" /> 头条
              	</Menu.Item>
              	<Menu.Item key="shehui" >
              	<Icon type = "appstore" /> 社会
              	</Menu.Item>
              	<Menu.Item key="guonei">
              	<Icon type = "appstore" /> 国内
              	</Menu.Item>
              	<Menu.Item key="guoji">
              	<Icon type = "appstore" /> 国际
              	</Menu.Item>
              	<Menu.Item key="yule">
              	<Icon type = "appstore" /> 娱乐
              	</Menu.Item>
              	<Menu.Item key="tiyu">
              	<Icon type = "appstore" /> 体育
              	</Menu.Item>
              	<Menu.Item key="keji">
              	<Icon type = "appstore" /> 科技
              	</Menu.Item>
              	<Menu.Item key="shishang">
              	<Icon type = "appstore" /> 时尚
              	</Menu.Item>
              	{userShow}
              </Menu>
      		
      		 <Modal title="用户中心" wrapClassName="vertical-center" visible={this.state.modalVisible} onCancel={()=>this._setModalVisible(false)} onOk={()=>this._setModalVisible(false)}
      		       okText="关闭">   
             <Tabs type="card" onChange={this._tabCallBack.bind(this)}>
              
              
              <TabPane tab="登录" key="1">
               <Form mode="horizontal"  onSubmit={this._handleSubmit.bind(this)}>
                <FormItem label="账户">
                 {getFieldDecorator ('userName') (<Input placeholder="请输入您的账号" />)}
                
                </FormItem>
                 <FormItem label="密码">
                {getFieldDecorator ('password') (<Input type="password" placeholder="请输入您的密码"/>)}
                
                </FormItem>
                 <Button type="primary" htmlType="submit">登录</Button>
               </Form>
              </TabPane>

              <TabPane tab="注册" key="2">
               <Form mode="horizontal" onSubmit={this._handleSubmit.bind(this)}>
                <FormItem label="账户">
                {getFieldDecorator ('r_userName') (<Input placeholder="请输入您的账号"  />) }
                </FormItem>
                <FormItem label="密码">
               {getFieldDecorator ('r_password')  (<Input type="password" placeholder="请输入您的密码" />)}
                </FormItem>
                <FormItem label="确认密码">
                {getFieldDecorator ('r_confirmPassword')  (<Input type="password" placeholder="请再次确认您的密码" /> )}
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
               </Form>
              </TabPane>
             </Tabs>
      		</Modal>
      		</Col>
      		<Col span={2}>
      		</Col>
      	</Row>
      </header>     
    );
  }
}

export default PcHeader = Form.create({})(PcHeader);
