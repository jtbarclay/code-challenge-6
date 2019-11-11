import React, { Component } from 'react'
import { connect } from 'react-redux';

export class ClassForm extends Component {

    state = {
        class: '',
    }

    inputHandler = (event, property) => {
        this.setState({
            [property]: event.target.value,
        })
    }

    buttonHandler = () => {
        console.log('click', this.state);
        if (this.state.class === '') {
            window.alert('Can not add empty class')
        } else {
            this.props.dispatch({ type: 'POST_CLASS', payload: this.state.class })
            this.setState({
                class: '',
            });
        }
    }

    render() {
        return (
            <div>
                <input
                    type='text'
                    placeholder='New Class'
                    value={this.state.class}
                    onChange={(event) => this.inputHandler(event, 'class')}
                />
                <button onClick={this.buttonHandler}>Add</button>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(ClassForm);
