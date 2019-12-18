import React, {Component} from 'react'
import {Text, StyleSheet, View, FlatList, ScrollView, Alert, TextInput, TouchableOpacity, Picker} from 'react-native';
import {ListItem, Icon} from 'react-native-elements'
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import {connect} from 'react-redux';
import { removeExerciseFromRoutine, addRoutineToCalendar } from '../redux/ActionCreators';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
 import Autocomplete from 'react-native-autocomplete-input';
// import {Autocomplete, withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
// import KeyboardSpacer from 'react-native-keyboard-spacer';
//
// const WithKeyboardAwareScrollView = withKeyboardAwareScrollView;
import RNPickerSelect from 'react-native-picker-select';

const mapStateToProps = state => {
    return {
        exercises: state.exercises,
        routines : state.routines,
        calendar : state.calendar
    }
}

const mapDispatchToProps = dispatch => ({
    removeExerciseFromRoutine: (exerciseID, routineID) => dispatch(removeExerciseFromRoutine(exerciseID, routineID)),
    addRoutineToCalendar: (dateString, routineID) => dispatch(addRoutineToCalendar(dateString, routineID))
});

function RenderExercise(props){
    const id = props.exercise.exerciseID;
    const type = props.exercise.type;

    const exercise = props.allExercises.filter(exercise => exercise.id == id)[0];
    const name = exercise.name;

    return (

        <ListItem
            title={name}
            titleStyle={{ fontSize: 20 }}
            subtitle={type}
            subtitleStyle={{ color: '#666' }}
            chevron
            bottomDivider
        />
    );
}



class Routine extends Component{

    constructor(props){
        super(props);
        this.state = {
            routineName : null,
            routineID: null,
            routine: null
        }
    }

    getExerciseName = (id, allExercises) => {
        const exercise = allExercises.filter(exercise => exercise.id == id)[0];
        return exercise.name;
    }
    onChangeText = (value, id) => {
        console.log(id-1);

        this.setState({routineName : value, routineID: id-1});
        // this.props.addRoutine();
    }

    render(){

        if(this.props.date){
            if(this.props.calendar){

                let routine = this.props.routines.routines.filter(routine => routine.id == this.props.calendar.routineID)[0];
                let PickerItems = this.props.routines.routines.map( (routine)=>{
                                     return {label: routine.name, value:routine.name, id:routine.id}
                                 });
                //Display routine
                return (
                    <View >
                        <RNPickerSelect
                            style={{inputIOS: {color: 'black', fontSize:32, alignSelf:'center', marginTop:1} }}
                            placeholder = {{
                                              label: 'Select a Routine...',
                                              value: null,
                                              color: '#9EA0A4',
                                            }}
                            value = {this.state.routineName ? this.state.routineName:routine.name}
                            onValueChange={(value, id) => this.onChangeText(value, id)}
                            onDonePress={() => {   if(this.state.routineID >= 0){
                                                        this.props.addRoutineToCalendar(this.props.date.dateString, this.state.routineID);
                                                        this.setState({routineName : null, routineID: null});
                                                    }
                                                }}
                            items={PickerItems}
                        />
                        <View>
                            <FlatList
                                data={routine.exercises}
                                renderItem={ ({item}) => (<RenderExercise exercise={item}
                                                                            routineID={routine.id}
                                                                            allExercises={this.props.allExercises}
                                                                            removeExerciseFromRoutine={this.props.removeExerciseFromRoutine}/>)}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.props}
                            />
                        </View>
                    </View>

                );
            }else{
                //Pick or create routine
                let PickerItems = this.props.routines.routines.map( (routine)=>{
                                     return {label: routine.name, value:routine.name, id:routine.id}
                                 });
                return (
                    <>


                        <View style={{flexDirection:'row', alignSelf:'center'}}>
                            <Text style={{fontSize:20,  marginLeft:20, marginRight:10}}>Routine | </Text>

                            <RNPickerSelect
                                style={{inputIOS: {color: '#c53119', fontSize:20, marginTop:1} }}
                                placeholder = {{
                                                  label: 'Select a Routine...',
                                                  value: null,
                                                  color: '#9EA0A4',
                                                }}
                                value = {this.state.routineName}
                                onValueChange={(value, id) => this.onChangeText(value, id)}
                                onDonePress={() => {if(this.state.routineID  >= 0){
                                                            this.props.addRoutineToCalendar(this.props.date.dateString, this.state.routineID);
                                                            this.setState({routineName : null, routineID: null});
                                                        }
                                                    }}
                                items={PickerItems}
                            />
                        </View>

                        <View style={{alignSelf:'center', marginTop:'15%'}}>
                            <Text>No Routine for {this.props.date.dateString}</Text>
                        </View>




                    </>
                );
            }
        }else{
            //Should never show
            return (
                <View style={{alignSelf:'center'}}>
                    <Text>No dates selected.</Text>
                </View>
            );
        }
    }
}

// <View style={styles.autocompletesContainer}>
//     <SafeAreaView>
//         <Autocomplete
//           style={{maxHeight: 40}}
//           initialValue={this.state.routineName}
//           handleSelectItem={(item) => {console.log('item');}}
//
//           onDropdownClose={console.log('onDropdownClose')}
//           onDropdownShow={console.log('onDropdownShow')}
//           fetchData={() => {return this.props.routines.routines}}
//           minimumCharactersCount={1}
//           highlightText
//           valueExtractor={item => item.name}
//           rightContent
//           rightTextExtractor={() => {}}
//         />
//
//     </SafeAreaView>
//   </View>

// <View style={{flexDirection:'row'}}>
//     <Text style={{fontSize:20, lineHeight: 30, marginLeft:10, marginRight:10}}>Routine</Text>
//     <View style={{flexGrow:1, marginRight:10}}>
//
//     <Autocomplete
//
//       style={{ height: 30, borderColor: 'gray', borderWidth: 1, alignSelf:'auto', paddingLeft:3}}
//       data={this.props.routines.routines.filter(routine => {
//                                                       return !this.state.isRoutineSelected
//                                                       && this.state.routineName
//                                                       && routine.name.toUpperCase().includes(this.state.routineName.trim().toUpperCase())
//                                                   } )}
//       defaultValue={this.state.routineName}
//       onChangeText={text => this.onChangeText(text)}
//       keyExtractor={(item) => item.id.toString()}
//       listStyle={{maxHeight:100}}
//       renderItem={ ({ item }) => (
//         <TouchableOpacity onPress={() => this.setState({routineName : item.name, routine:item, isRoutineSelected:true})}>
//           <Text>{item.name}</Text>
//         </TouchableOpacity>
//       )}
//     />
//
//     </View>
// </View>

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedDate : {
              dateString: null,
              day: null,
              month: null,
              timestamp: null,
              year: null,
            }
        };



    }

    componentDidMount(){
        let d = new Date();
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        let dateString = `${year}-${month}-${day}`;
        let timestamp = d.getTime();


        let todaysDate = {
          dateString: dateString,
          day: day,
          month: month,
          timestamp: timestamp,
          year: year
        }

        console.log(this.props);

        this.setState({selectedDate : todaysDate});
    }




    render(){

        // LocaleConfig.locales['fr'] = {
        //   monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
        //   monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
        //   dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
        //   dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
        //   today: 'Aujourd\'hui'
        // };
        // LocaleConfig.defaultLocale = 'fr';

        return (
            <KeyboardAwareScrollView>
                    <Calendar style={{marginBottom: 20}}
                      // // Initially visible month. Default = Date()
                      // current={'2019-03-01'}
                      // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                      minDate={'2012-05-10'}
                      // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                      // maxDate={'2012-05-30'}
                      // // Handler which gets executed on day press. Default = undefined
                      onDayPress={(day) => {this.setState({selectedDate : day})}}
                      // // Handler which gets executed on day long press. Default = undefined
                      // onDayLongPress={(day) => {console.log('selected day', day)}}
                      // // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                      // monthFormat={'yyyy MM'}
                      // // Handler which gets executed when visible month changes in calendar. Default = undefined
                      // onMonthChange={(month) => {console.log('month changed', month)}}
                      // // Hide month navigation arrows. Default = false
                      // hideArrows={true}
                      // // Replace default arrows with custom ones (direction can be 'left' or 'right')
                      // renderArrow={(direction) => (<Arrow />)}
                      // // Do not show days of other months in month page. Default = false
                      hideExtraDays={true}

                      markedDates={{
                          [this.state.selectedDate.dateString]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                      }}

                      // // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                      // // day from another month that is visible in calendar page. Default = false
                      // disableMonthChange={true}
                      // // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                      // firstDay={1}
                      // // Hide day names. Default = false
                      // hideDayNames={true}
                      // // Show week numbers to the left. Default = false
                      // showWeekNumbers={true}
                      // // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                      // onPressArrowLeft={substractMonth => substractMonth()}
                      // // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                      // onPressArrowRight={addMonth => addMonth()}
                    />
                <Routine
                        date={this.state.selectedDate}
                        calendar={this.props.calendar.dates.filter(item => item.date == this.state.selectedDate.dateString)[0]}
                        routines={this.props.routines}
                        allExercises={this.props.exercises.exercises}
                        removeExerciseFromRoutine={this.props.removeExerciseFromRoutine}
                        addRoutineToCalendar={this.props.addRoutineToCalendar}/>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        marginTop: 20
    },
    autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8,
  },
  input: {maxHeight: 40},
  inputContainer: {
    display: "flex",
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#c7c6c1",
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: "5%",
    width: "100%",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  plus: {
    position: "absolute",
    left: 15,
    top: 10,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
