import React, { Component } from 'react'
import { connect } from 'react-redux';

export class AnimalForm extends Component {

    state={
        newAnimal: '',
        class: '',
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_CLASSES' });
    }

    inputHandler = (event, property) => {
        this.setState({
            [property]: event.target.value,
        })
    }

    buttonHandler = () => {
        console.log('click', this.state);
        this.props.dispatch({ type: 'POST_ANIMAL', payload: this.state})
        this.setState({
            newAnimal: '',
            class: '',
        });
    }
    
    render() {
        return (
            <div>
                <input
                    type='text'
                    value={this.state.newAnimal}
                    onChange={(event) => this.inputHandler(event, 'newAnimal')}
                />
                <select
                    onChange={(event) => this.inputHandler(event, 'class')}
                    value={this.state.class}
                >
                    <option value=''>Class</option>
                    {this.props.reduxState.animalClasses && this.props.reduxState.animalClasses.map((animalclass) => (
                        <option key={animalclass.id} value={animalclass.id}>{animalclass.class_name}</option>
                    ))}
                </select>
                <button onClick={this.buttonHandler}>Add</button>
                {/* <pre>{JSON.stringify(this.state, null, 2)}</pre>
                <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
            </div>
        )
    }
}

// Makes our reducers available in our component
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(AnimalForm);
