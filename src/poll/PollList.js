import React, { Component } from 'react';

import '../poll/PollList.css';

import Poll from './Poll';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, notification } from 'antd';

class PollList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            currentVotes: [],
            isLoading: false
        };
        //this.loadPollList = this.loadPollList.bind(this);
        //this.handleLoadMore = this.handleLoadMore.bind(this);
    }
  render() {
    const pollViews = [];
    this.state.polls = [{"id":188,"question":"How many banans do you have?",
    "choices":[{"id":501,"text":"1","voteCount":0},{"id":502,"text":"2","voteCount":0},
    {"id":503,"text":"0","voteCount":1}],"createdBy":{"id":582,"username":"shaan","name":"Shaan"},
    "creationDateTime":"2018-06-20T10:05:21Z","expirationDateTime":"2018-06-21T10:05:21Z","totalVotes":1,"expired":false, "selectedChoice":502},{"id":189,"question":"How many apples do you have?",
    "choices":[{"id":501,"text":"1","voteCount":0},{"id":502,"text":"2","voteCount":23},
    {"id":503,"text":"0","voteCount":1},{"id":504,"text":"5","voteCount":2}],"createdBy":{"id":582,"username":"Ak","name":"Adeepa"},
    "creationDateTime":"2018-06-15T10:05:21Z","expirationDateTime":"2018-07-14T10:05:21Z","totalVotes":26,"expired":true}];
    
    this.state.polls.forEach((poll, pollIndex) => { 
        pollViews.push(<Poll 
            key={poll.id} 
            poll={poll}
            currentVote={this.state.currentVotes[pollIndex]} 
            handleVoteChange={(event) => this.handleVoteChange(event, pollIndex)}
            handleVoteSubmit={(event) => this.handleVoteSubmit(event, pollIndex)} />)            
    });
    return (
        <div className="polls-container">
        {pollViews}
        {
            !this.state.isLoading && this.state.polls.length === 0 ? (
                <div className="no-polls-found">
                    <span>No Polls Found.</span>
                </div>    
            ): null
        }  
        {
            !this.state.isLoading && !this.state.last ? (
                <div className="load-more-polls"> 
                    <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                        <Icon type="plus" /> Load more
                    </Button>
                </div>): null
        }              
        {
            this.state.isLoading ? 
            <LoadingIndicator />: null                     
        }
    </div>
    );
  }
}

export default PollList;
