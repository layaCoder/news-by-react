
import React from 'react';
import ReactDOM from 'react-dom';
import PcHeader from './pc_header';
import PcFooter from './pc_footer';
import NewsContainer from './pc_newscontainer';


class PcIndex extends React.Component {

  render () {
    return (
     <div>
       <PcHeader/>
        <NewsContainer/>
       <PcFooter/>
     </div>
    );
  }
}

export default PcIndex;
