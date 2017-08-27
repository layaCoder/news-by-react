
import React from 'react';
import ReactDOM from 'react-dom';
import {Tabs,Carousel} from 'antd';
import { Row,Col} from 'antd';
import PcNewsBlock from './pc_news_block';
import NewsImageBlock from './pc_news_image_block';
import PcProduct from './pc_product';

const TabPane = Tabs.TabPane;


//获取图片数据json
var imageDatas = require('../data/imageDatas.json');


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

class NewsContainer extends React.Component {

  render () {
 

 const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    };


   const imageArray= imageDatas.length 
   ?
     imageDatas.map((imageData,index)=>(
       <div><img src={imageData.imageURL} key={index} /></div>
      ))
   :
   '没有加载任何图片';


    return (
       <div>
        <Row>
        	<Col span={2}></Col>
        	<Col span={20} className="container">
              <div className="leftContainer">
              	<div className="carousel">
              		<Carousel {...settings}>
              		{imageArray}
              		</Carousel>
              	</div>
               <NewsImageBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px"/>
              </div> 

              <Tabs className="tabs_news"  >
               <TabPane tab="新闻" key="1">
                <PcNewsBlock count="22" type="top" width="100%" border = "false"/>
               </TabPane>
               <TabPane tab="国际" key="2">
                <PcNewsBlock count="22" type="guoji" width="100%" border = "false"/>
               </TabPane>
               <TabPane tab="娱乐" key="3">
                <PcNewsBlock count="22" type="yule" width="100%" border = "false"/>
               </TabPane>
               <TabPane tab="体育" key="4">
                <PcNewsBlock count="22" type="tiyu" width="100%" border = "false"/>
               </TabPane>
              </Tabs>

              <Tabs className="tabs_product"> 
                <TabPane tab="React product" key="5">
                 <PcProduct/>
                </TabPane>
              </Tabs>
              <NewsImageBlock count={10} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="140px"/>
               <NewsImageBlock count={10} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="140px"/>
        	</Col>
        	<Col span={2}></Col>
        </Row>
       </div>
    );
  }
}

export default NewsContainer;
