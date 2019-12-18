import React, {Component} from 'react';
import {StyleSheet, FlatList, ScrollView, Alert, Text} from 'react-native';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
// import { deleteRoutine } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        exercises: state.exercises
    }
}

// const mapDispatchToProps = (dispatch) => ({
//     deleteRoutine: (routineID) => dispatch(deleteRoutine(routineID))
// })


function RenderExercise(props){
    const id = props.exercise.exerciseID;
    const type = props.exercise.type;

    const exercise = props.allExercises.filter(exercise => exercise.id == id)[0];

    const name = exercise.name;

    const rightButton = [
        {
            text: 'Delete',
            type: 'delete',
            onPress: () => {
                Alert.alert(
                    'Delete '+ exercise.name +'?',
                    '',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Not Deleted')
                        },
                        {
                            text: 'Delete',
                            onPress: () => console.log('delete'),
                            style: 'destructive'
                        }
                    ],
                    { cancelable: false }
                );

            }
        }
    ];
    return(
        <Swipeout right={rightButton} autoClose={true}>
            <ListItem
                title={name}
                titleStyle={{ fontSize: 20 }}
                subtitle={type}
                subtitleStyle={{ color: '#666' }}
                chevron
                bottomDivider
              />
        </Swipeout>
    );
}

class EditRoutine extends Component{

    render(){
        const routine = this.props.navigation.getParam('routine');

        return (
            <ScrollView style={styles.container}>
                <Text style={{alignSelf:'center', fontSize:32}}>{routine.name}</Text>
                <FlatList
                    data={routine.exercises}
                    renderItem={ ({item}) => (<RenderExercise exercise={item} allExercises={this.props.exercises.exercises} />)}
                    keyExtractor={(item, index) => index.toString()}
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

export default connect(mapStateToProps)(EditRoutine);
