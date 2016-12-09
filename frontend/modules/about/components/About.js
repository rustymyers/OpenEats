import React from 'react'

require("./../css/about.scss");

export default React.createClass({
  render: function() {
    return (
      <section className="success" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>The OpenEats Project</h2>
              <hr className="star-light"/>
            </div>
          </div>
          <div className="row">
            <p>OpenEats is a recipe management site that allows users to create, share, and store recipes. This fork uses Django Rest Framework as a backend and React (with flux) as a front end. </p>
          </div>
          <div className="row">
            <p>The main goals of this project are two fold. One, I wanted a place to store my personal collection of recipes and share them with close friends and family. Two, I wanted to learn react :). I went digging around for a starting point and gathering ideas when i came across open eats. It had some cool ideas and was well documented for the most part.</p>
          </div>
          <div className="row">
            <p>I have a lot of ideas as far as features go. But since I moved the whole UI to react and the backend to a pure API, I'm currently working on getting the core of the project stable.  The Core, in my mind, consists of a few things.</p>
            <ol>
              <li>Creating, viewing, and editing recipes.</li>
              <li>Browsing and searching for recipes.</li>
              <li>A simple homepage and about page.</li>
            </ol>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <p className="tagline">Hope you enjoy it! :D</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
});
