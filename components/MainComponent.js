import React, { Component } from 'react';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import SafeAreaView from 'react-native-safe-area-view';
import Home from './HomeComponent';
import Routines from './RoutinesComponent';
import EditRoutine from './EditRoutineComponent';
import CreateRoutine from './EditRoutineComponent';
import Exercises from './ExercisesComponent';
import {connect} from 'react-redux';
import {fetchRoutines, fetchExercises, fetchCalendar} from '../redux/ActionCreators';
// Remove react-native-gesture-handler with npm / yarn and then expo install react-native-gesture-handler

const mapStateToProps = state => {
    return {};
}
const mapDispatchToProps = dispatch => ({
    fetchRoutines: () => dispatch(fetchRoutines()),
    fetchExercises: () => dispatch(fetchExercises()),
    fetchCalendar: () => dispatch(fetchCalendar()),
});

const HomeNavigator = createStackNavigator({
    Home : {
        screen : Home,
        navigationOptions: ({ navigation }) => ({
          title: 'Home',
          headerStyle: {
              backgroundColor: "#03808b",
              marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
          },
          headerTitleStyle: {
              color: "#fff"
          },
          headerTintColor: "#fff",
          headerLeft: <Icon name="menu" size={24} style={{marginLeft:40}}
              color= '#fff'
              onPress={ () => navigation.toggleDrawer() }
              />
        })
    }
});

const RoutineNavigator = createStackNavigator({
    RoutinesList : {
        screen : Routines,
        navigationOptions: ({ navigation }) => ({
          title: 'Routines',
          headerStyle: {
              backgroundColor: "#03808b"
          },
          headerTitleStyle: {
              color: "#fff"
          },
          headerTintColor: "#fff",
          headerLeft: <Icon name="menu" size={24}
              color= '#fff'
              onPress={ () => navigation.toggleDrawer() }
              />,
          headerRight: <Icon name="plus-circle" type='font-awesome' size={24} style={{marginRight: 15}}
              color= '#fff'
              onPress={ () => navigation.navigate('CreateRoutine') }
              />
        })
    },
    EditRoutine: {
        screen: EditRoutine,
        navigationOptions: () => ({
          title: 'Edit Routine',
        }),
    },
    CreateRoutine: {
        screen: CreateRoutine,
        navigationOptions: () => ({
          title: 'Create Routine',
        }),
    }
});
const ExerciseNavigator = createStackNavigator({
    ExercisesList : {
        screen : Exercises,
        navigationOptions: ({ navigation }) => ({
          title: 'Exercices',
          headerStyle: {
              backgroundColor: "#03808b"
          },
          headerTitleStyle: {
              color: "#fff"
          },
          headerTintColor: "#fff",
          headerLeft: <Icon name="menu" size={24}
              color= '#fff'
              onPress={ () => navigation.toggleDrawer() }
              />
        })
    }
});

const Drawer = createDrawerNavigator({
    Home: { screen: HomeNavigator,
            navigationOptions: {
              title: 'Home',
              drawerLabel: 'Home',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='home'
                  type='font-awesome'
                  size={24}
                  color='#000'
                />
              )
            }
        },
    Routines: { screen: RoutineNavigator,
            navigationOptions: {
              title: 'Routines',
              drawerLabel: 'Routines',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='list-ol'
                  type='font-awesome'
                  size={24}
                  color='#000'
                />
              )
            }
        },
    Exercises: { screen: ExerciseNavigator,
            navigationOptions: {
              title: 'Exercises',
              drawerLabel: 'Exercises',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='heartbeat'
                  type='font-awesome'
                  size={24}
                  color='#000'
                />
              )
            }
        }
}, {
  drawerBackgroundColor: '#02a8bc',
  contentOptions : {
      activeTintColor: 'black',
      inactiveTintColor: '#025d60',
      inactiveBackgroundColor: 'transparent',
  }
});

const Nav = createAppContainer(Drawer);

class Main extends Component {

    componentDidMount(){
        this.props.fetchRoutines();
        this.props.fetchExercises();
        this.props.fetchCalendar();
    }

  render() {

    return (
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <Nav />
        </View>
    );
  }

}

// export default Main;
export default connect(mapStateToProps, mapDispatchToProps)(Main);
