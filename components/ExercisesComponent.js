import React, {Component} from 'react';
import {StyleSheet, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';

const mapStateToProps = state => {
    return {
        exercises: state.exercises
    }
}

class Exercises extends Component{

    render(){

        console.log('RENDER');
        console.log(this.props.exercises.exercises);

        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={this.props.exercises.exercises}
                    renderItem={({item, index}) => (
                                                    <ListItem
                                                        key={index}
                                                        title={item.name}
                                                        chevron = {true}
                                                    />
                                                )}
                    keyExtractor={item => item.id.toString()}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    }
});

export default connect(mapStateToProps)(Exercises);
