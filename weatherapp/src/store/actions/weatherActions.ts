import {ThunkAction} from 'redux-thunk'// we can use to define types for those arguments: dispatch and getState
import {WeatherData, WeatherAction, WeatherError,GET_WEATHER, SET_ERROR, SET_LOADING} from '../types'
import {RootState} from'..'
export const getweather = (city: string):ThunkAction<void,RootState,null,WeatherAction>=>{
    return async dispatch=>{
        try {
            const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
            if(!response.ok){
                const resData : WeatherError = await response.json();
                throw new Error(resData.message)
            }
            const resData : WeatherData = await response.json();
            dispatch({ type: GET_WEATHER, payload: resData})
            
        } catch (error) {
            dispatch({type:SET_ERROR, payload:error.message})
            
        }
    }

}
export const setLoading=(): WeatherAction =>{
    return {
        type: SET_LOADING
    }
}
export const setError =(): WeatherAction => {
    return{type: SET_ERROR, payload:''}
}