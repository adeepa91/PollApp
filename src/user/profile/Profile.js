import React, { Component } from 'react';

import PollList from '../../poll/PollList';
import { Avatar, Tabs } from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/Helpers';
import LoadingIndicator  from '../../common/LoadingIndicator';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
import './Profile.css';
const TabPane = Tabs.TabPane;

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: {"id":593,"username":"Adee","name":"Adee","joinedAt":"2018-06-22T06:47:34Z","pollCount":1,"voteCount":1},
        isLoading: false
    }
    //this.loadUserProfile = this.loadUserProfile.bind(this);
}

  render() {
  //   if(this.state.isLoading) {
  //     return <LoadingIndicator />;
  // }

  // if(this.state.notFound) {
  //     return <NotFound />;
  // }

  // if(this.state.serverError) {
  //     return <ServerError />;
  // }

  const tabBarStyle = {
      textAlign: 'center'
  };

    return (
      <div className="profile">
        {
          this.state.user ? (
            <div className="user-profile">
              <div className="user-details">
                <div className="user-avatar">
                  <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.state.user.name) }}>
                    {this.state.user.name[0].toUpperCase()}
                  </Avatar>
                </div>
                <div className="user-summary">
                  <div className="full-name">{this.state.user.name}</div>
                  <div className="username">@{this.state.user.username}</div>
                  <div className="user-joined">
                    Joined {formatDate(this.state.user.joinedAt)}
                  </div>
                </div>
              </div>
              <div className="user-poll-details">
                <Tabs defaultActiveKey="1"
                  animated={true}
                  tabBarStyle={tabBarStyle}
                  size="large"
                  className="profile-tabs">
                  <TabPane tab={`${this.state.user.pollCount} Polls`} key="1">
                    <PollList username={this.props.match.params.username} type="USER_CREATED_POLLS" />
                  </TabPane>
                  <TabPane tab={`${this.state.user.voteCount} Votes`} key="2">
                    <PollList username={this.props.match.params.username} type="USER_VOTED_POLLS" />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default Profile;