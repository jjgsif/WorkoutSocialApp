import { db, auth } from "../firebaseConfig";
import {ref, set, onValue} from 'firebase/database'


export const getWorkouts = async (setWorkout : any) => {
    const object = ref(db, 'users/' + auth.currentUser?.uid + '/workouts');
    onValue(object, (s)=>{setWorkout(s.val()); console.log(s.val());});
}

export const setWorkouts = async (origin : any, addition : any) => {
    const cpy = origin; //copies the state
    cpy.push(addition); //adds the new workout to the object
    set(ref(db, 'users/' + auth.currentUser?.uid+ '/workouts'), cpy); //Sends it to the database;
}