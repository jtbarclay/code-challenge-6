import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnimalListItem from '../AnimalListItem/AnimalListItem';

// DO NOT MODIFY THIS FILE FOR BASE MODE!

class AnimalList extends Component {

    componentDidMount() {
        const action = {type: 'GET_ZOO_ANIMALS'};
        this.props.dispatch(action);
    }

    handleDelete = (id) => {
        // console.log('delete click', id);
        this.props.dispatch({ type: 'DELETE_ANIMAL', payload: id});
    }

    // Renders the list of animals
    render() {
        return (
            <table className="AnimalList">
                <thead>
                    <tr><th>Species</th><th>Class</th><th></th></tr>
                </thead>
                <tbody>
                    {/* Render each item from the zooAnimal reducer */}
                    {this.props.reduxState.zooAnimals.map((classData, i) => {
                        return (<AnimalListItem key={classData.id} classData={classData} handleDelete={this.handleDelete} />);
                    })}
                </tbody>
            </table>
        );
    }
}

// Makes our reducers available in our component
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(AnimalList);
