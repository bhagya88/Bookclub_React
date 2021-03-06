import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getMembers } from '../actions/member_actions';

class Members extends Component{


componentDidMount() {
  
  this.props.getMembers();


}
	
render(){



return (


       <div className="row">

            {/*<!--Member panel listing names and avatar -->*/}
            <div className="col sm12 m5 lg5">
            <div className="choice-panel">
                  <ul className="collection">
                      {/edit/.test(this.props.pathname)?<Link to="/app/members/edit" >
                      <li className="collection-item avatar teal white-text">
                          <i className="material-icons circle teal">mode_edit</i>
                          <span className="title">Edit my profile</span>
                      </li>
                       </Link>:<Link to="/app/members/edit" >
                      <li className="collection-item avatar">
                          <i className="material-icons circle teal">mode_edit</i>
                          <span className="title">Edit my profile</span>
                      </li>
                       </Link>}


                      { this.props.members.map((e,i)=>{

                        let imglink;
                        let detailLink ="/app/members/"+e.id;

                         if(e.piclink){

                          imglink = "/img/"+  e.piclink ;
                        
                          }else{
                          
                          imglink = "/img/unknown.png"

                        }

                    
                    if ((this.props.params.id && (this.props.params.id == e.id)) || ( i === 0 && !this.props.params.id && !/edit/.test(this.props.pathname))){

                     
                       return (

                       <Link to={ detailLink } key={e.id}>
                         <li className="collection-item avatar teal white-text">
                            <img src={ imglink } alt="" className="circle" />
                            <span className="title">{ e.fname} {e.lname}</span>
                        </li>
                      </Link>

                      );

                    }else{

                       return (

                       <Link to={ detailLink } key={e.id}>
                         <li className="collection-item avatar">
                            <img src={ imglink } alt="" className="circle" />
                            <span className="title">{ e.fname} {e.lname}</span>
                        </li>
                      </Link>

                      );
                      
                    }
                    

                     },this)
                  }
                 
                     

                     
                  </ul>
            </div>
            </div>

            <div className="col sm12 m7 lg7">
           
              { this.props.children }
            </div> {/*<!--closes detail column -->*/}


           
        {/*<!--closes row -->*/}

    </div> 
		);
	}

}

Members.propTypes = {

  members : React.PropTypes.array

 
}

function mapStateToProps(state,ownProps){

  
    return {
      members : state.members,
      pathname: ownProps.location.pathname
    }

 
}


export default connect(mapStateToProps,{ getMembers })(Members);