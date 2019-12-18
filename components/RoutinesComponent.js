import React, {Component} from 'react';
import {StyleSheet, FlatList, ScrollView, Alert} from 'react-native';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { deleteRoutine } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        routines : state.routines
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteRoutine: (routineID) => dispatch(deleteRoutine(routineID))
})


function RenderRoutine(props){
    const routine = props.routine;

    const rightButton = [
        {
            text: 'Delete',
            type: 'delete',
            onPress: () => {
                Alert.alert(
                    'Delete '+ routine.name +'?',
                    '',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Not Deleted')
                        },
                        {
                            text: 'Delete',
                            onPress: props.onDeletePress,
                            style: 'destructive'
                        }
                    ],
                    { cancelable: false }
                );

            }
        }
    ];
    const leftButton = [
        {
            text: 'Edit',
            type: 'primary',
            onPress: props.onEditPress
        }
    ];
    return(
        <Swipeout right={rightButton} left={leftButton} autoClose={true}>
            <ListItem
                title={routine.name}
                chevron={true}
              />
        </Swipeout>
    );
}

class Routines extends Component{

    onEditPress = (routine) => {
        const { navigate } = this.props.navigation;
        navigate('EditRoutine', {routine: routine});
    }

    render(){

        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={this.props.routines.routines}
                    renderItem={ ({item}) => (<RenderRoutine routine={item}
                                                            onDeletePress={() => this.props.deleteRoutine(item.id)}
                                                            onEditPress={() => this.onEditPress(item)}
                                                />)}
                    keyExtractor={routine => routine.id.toString()}
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

export default connect(mapStateToProps,mapDispatchToProps)(Routines);
