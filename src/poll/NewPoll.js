import React, { Component } from 'react';

import { createPoll } from '../util/APIUtils';
import { MAX_CHOICES, POLL_QUESTION_MAX_LENGTH, POLL_CHOICE_MAX_LENGTH } from '../constants';
import '../poll/NewPoll.css';
import { Form, Input, Button, Icon, Select, Col, notification } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input

class NewPoll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: {
                text: ''
            },
            choices: [{
                text: ''
            }, {
                text: ''
            }],
            pollLength: {
                days: 1,
                hours: 0
            }
        };
        // this.addChoice = this.addChoice.bind(this);
        // this.removeChoice = this.removeChoice.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleQuestionChange = this.handleQuestionChange.bind(this);
        // this.handleChoiceChange = this.handleChoiceChange.bind(this);
        // this.handlePollDaysChange = this.handlePollDaysChange.bind(this);
        // this.handlePollHoursChange = this.handlePollHoursChange.bind(this);
        // this.isFormInvalid = this.isFormInvalid.bind(this);
    }

  render() {
    const choiceViews = [];
    this.state.choices.forEach((choice, index) => {
        choiceViews.push(<PollChoice key={index} choice={choice} choiceNumber={index} removeChoice={this.removeChoice} handleChoiceChange={this.handleChoiceChange}/>);
    });
    return (
        <div className="new-poll-container">
        <h1 className="page-title">Create Poll</h1>
        <div className="new-poll-content">
            <Form onSubmit={this.handleSubmit} className="create-poll-form">
                <FormItem validateStatus={this.state.question.validateStatus}
                    help={this.state.question.errorMsg} className="poll-form-row">
                <TextArea 
                    placeholder="Enter your question"
                    style = {{ fontSize: '16px' }} 
                    autosize={{ minRows: 3, maxRows: 6 }} 
                    name = "question"
                    value = {this.state.question.text}
                    onChange = {this.handleQuestionChange} />
                </FormItem>
                {choiceViews}
                <FormItem className="poll-form-row">
                    <Button type="dashed" onClick={this.addChoice} disabled={this.state.choices.length === MAX_CHOICES}>
                        <Icon type="plus" /> Add a choice
                    </Button>
                </FormItem>
                <FormItem className="poll-form-row">
                    <Col xs={24} sm={4}>
                        Poll length: 
                    </Col>
                    <Col xs={24} sm={20}>    
                        <span style = {{ marginRight: '18px' }}>
                            <Select 
                                name="days"
                                defaultValue="1" 
                                onChange={this.handlePollDaysChange}
                                value={this.state.pollLength.days}
                                style={{ width: 60 }} >
                                {
                                    Array.from(Array(8).keys()).map(i => 
                                        <Option key={i}>{i}</Option>                                        
                                    )
                                }
                            </Select> &nbsp;Days
                        </span>
                        <span>
                            <Select 
                                name="hours"
                                defaultValue="0" 
                                onChange={this.handlePollHoursChange}
                                value={this.state.pollLength.hours}
                                style={{ width: 60 }} >
                                {
                                    Array.from(Array(24).keys()).map(i => 
                                        <Option key={i}>{i}</Option>                                        
                                    )
                                }
                            </Select> &nbsp;Hours
                        </span>
                    </Col>
                </FormItem>
                <FormItem className="poll-form-row">
                    <Button type="primary" 
                        htmlType="submit" 
                        size="large" 
                        //disabled={this.isFormInvalid()}
                        className="create-poll-form-button">Create Poll</Button>
                </FormItem>
            </Form>
        </div>    
    </div>
    );
  }
}

function PollChoice(props) {
    return (
        <FormItem validateStatus={props.choice.validateStatus}
        help={props.choice.errorMsg} className="poll-form-row">
            <Input 
                placeholder = {'Choice ' + (props.choiceNumber + 1)}
                size="large"
                value={props.choice.text} 
                className={ props.choiceNumber > 1 ? "optional-choice": null}
                onChange={(event) => props.handleChoiceChange(event, props.choiceNumber)} />

            {
                props.choiceNumber > 1 ? (
                <Icon
                    className="dynamic-delete-button"
                    type="close"
                    disabled={props.choiceNumber <= 1}
                    onClick={() => props.removeChoice(props.choiceNumber)}
                /> ): null
            }    
        </FormItem>
    );
}

export default NewPoll;