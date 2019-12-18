import * as ActionTypes from './ActionTypes';
import { ROUTINES } from '../shared/routines';
import { EXERCISES } from '../shared/exercises';
import { CALENDAR } from '../shared/calendar';


//--CALENDAR
export const fetchCalendar = () => (dispatch) => {

    let calendar = CALENDAR;

    console.log(calendar);

    if(calendar){
        dispatch(loadCalendar(calendar));
    }else{
        dispatch(calendarFailed('Could not load calendar'));
    }
};
export const calendarFailed = (errmess) => ({
    type: ActionTypes.CALENDAR_FAILED,
    payload: errmess
});
export const loadCalendar = (calendar) => ({
    type: ActionTypes.LOAD_CALENDAR,
    payload: calendar
});
export const addRoutineToCalendar = (dateString, routineID) => ({
    type: ActionTypes.ADD_ROUTINE_TO_CALENDAR,
    payload: {dateString:dateString, routineID:routineID}
})


//--ROUTINES
export const fetchRoutines = () => (dispatch) => {

    console.log('fetch');
    let routines = ROUTINES;
    console.log(routines);
    if(routines){
        dispatch(loadRoutines(routines));
    }else{
        dispatch(failedRoutines('Could not load routines'));
    }
};
export const routinesFailed = (errmess) => ({
    type: ActionTypes.ROUTINES_FAILED,
    payload: errmess
});
export const loadRoutines = (routines) => ({
    type: ActionTypes.LOAD_ROUTINES,
    payload: routines
});
export const postRoutine = (id, name, exercises) => (dispatch) => {

    let d = new Date();
    let date = d.toISOString();
    let routine = {
        id : null,
        name: dishId,
        exercises: exercises,
        dateCreated: date
    }

    setTimeout(function(){
        dispatch(loadRoutine(routine));
    }, 2000);
};
export const loadRoutine = (routine) => ({
    type: ActionTypes.LOAD_ROUTINE,
    payload: routine
});
export const deleteRoutine = (routineID) => ({
    type: ActionTypes.DELETE_ROUTINE,
    payload: routineID
});
export const removeExerciseFromRoutine = (exerciseID, routineID) => ({
    type: ActionTypes.REMOVE_EXERCISE_FROM_ROUTINE,
    payload: {exerciseID: exerciseID, routineID: routineID}
});



//--EXERCICES
export const fetchExercises = () => (dispatch) => {

    // let exercises = require('../shared/exercises.js');
    let exercises = EXERCISES;
    if(exercises){
        dispatch(loadExercises(exercises));
    }else{
        dispatch(failedExercises('Could not load exercises'));
    }
};

export const exercisesFailed = (errmess) => ({
    type: ActionTypes.EXERCISES_FAILED,
    payload: errmess
});

export const loadExercises = (exercises) => ({
    type: ActionTypes.LOAD_EXERCISES,
    payload: exercises
});

export const postExercise = (id, name) => (dispatch) => {

    let d = new Date();
    let date = d.toISOString();
    let exercise = {
        id : null,
        name: dishId,
        dateCreated: date
    }

    setTimeout(function(){
        dispatch(loadExercise(exercise));
    }, 2000);
};
export const loadExercise = (exercise) => ({
    type: ActionTypes.LOAD_EXERCISE,
    payload: exercise
});
