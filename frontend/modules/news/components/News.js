import React from 'react'
import request from 'superagent';
import {Carousel} from 'react-bootstrap'
import MiniBrowse from '../../browse/components/MiniBrowse'
import {serverURLs} from '../../common/config'

require("./../css/news.scss");

export default React.createClass({
  loadNewsFromServer: function() {
    var url = serverURLs.news;
    request
      .get(url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          this.setState({ news: res.body.results });
        } else {
          console.error(url, err.toString());
        }
      })
  },
  getInitialState: function() {
    return { news: [], };
  },
  componentDidMount: function() {
    this.loadNewsFromServer();
  },
  render: function() {
    return (
      <div>
        <NewsCarousel data={this.state.news}/>
        <div className="container">
          <div className="row">
            <MiniBrowse format="col-xs-12 col-sm-6 col-md-3" qs="&limit=4" />
          </div>
        </div>
      </div>
    );
  }
});


var NewsCarousel = React.createClass({
  render: function() {
    var entryNodes = this.props.data.map(function(entry) {
      return (
        <Carousel.Item key={entry.id}>
          <img src={entry.image}/>
          <Carousel.Caption>
            <h3>{entry.title}</h3>
            <p dangerouslySetInnerHTML={{__html: entry.content}}/>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });
    return (
      <Carousel>
        {entryNodes}
      </Carousel>
    );
  }
});