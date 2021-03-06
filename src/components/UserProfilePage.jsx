import React, { Component } from 'react';
import '../styles/App.css';
import logo from '../logo.svg';

class UserProfilePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "Mike",
      description: "An avid walker and Toronto fan",
      completed: ["King", "Queen", "Bathurst", "Lakeshore", "Yonge", "Bay"]
    }
  }

//.map doesn't seem to be able to break.  But the concept is in place.
//maybe try a for-loop.
  render() {

    return (
      <div>
        <aside className = "new-profile-container">
          <div className="profile-input-sidebar">
            <div className="user-profile-info">
              <div>The User Profile Page</div>
              <img src={logo} className="user-profile-pic" alt="logo" />
              <div className="user-profile-name">{this.state.name}</div>
              <div className="user-profile-description">{this.state.description}</div>
              <div className="additional-profile-info">
                <div className = "profile-info">
                  THE COLLECTION OF MAPS
                </div>
              </div>
           </div>
         </div>
        </aside>
      </div>
    )
  }
}

export default UserProfilePage
