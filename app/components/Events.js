import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getEvents } from '../actions/event_actions';
import dateFormat from 'dateformat';

class Events extends Component{

  componentDidMount() {

    if (this.props.events.length == 0) {
      console.log("Events: Reloading")
      this.props.getEvents();
    }
  }

  render() {
    //if (this.props.events == []) return (<div></div>);

    let list = this.props.events.map((event,i) => {
      let detailLink = `/app/events/${event.id}`;
      let date = dateFormat(new Date(event.dt), "mmmm dS, yyyy");
      if ((this.props.params.id && (this.props.params.id == event.id)) || ( i === 0 && !this.props.params.id && !/new/.test(this.props.pathname))){

         return (
        <Link to={ detailLink } key={event.id} >
        <li className="collection-item avatar teal white-text" key={event.id}>
            <i className="material-icons circle teal">today</i>
            <span className="title">{date}</span>
        </li>
        </Link>
        );

      }else{
        return (
        <Link to={ detailLink } key={event.id} >
        <li className="collection-item avatar" key={event.id}>
            <i className="material-icons circle teal">today</i>
            <span className="title">{date}</span>
        </li>
        </Link>
       );
                      
                    }
                    

                     },this)
                  

    return (
    <div className="row">

            {/*<!--Member panel listing names and avatar -->*/}
            <div className="col sm12 m5 lg5">
            <div className="choice-panel">
                  <ul className="collection">
                    {/new/.test(this.props.pathname)?<li className="collection-item avatar teal white-text">
                      <Link to="/app/events/new">
                        <i className="material-icons circle teal white-text">today</i>
                        <span className="title white-text">Create New Event</span>
                      </Link>
                    </li>:<li className="collection-item avatar">
                      <Link to="/app/events/new">
                        <i className="material-icons circle teal">today</i>
                        <span className="title">Create New Event</span>
                      </Link>
                    </li>}
                    { list }
                  </ul>
            </div>
            </div>

            <div className="col sm12 m7 lg7">
              {this.props.children}
            </div> {/* <!--closes id main-panel--> */}
      </div>
    );
  }

}

Events.propTypes = {
  events : React.PropTypes.array
}

function mapStateToProps(state, ownProps){
    return {
      events : state.events.all,
      pathname: ownProps.location.pathname
    }
}

export default connect(mapStateToProps,{ getEvents })(Events);
