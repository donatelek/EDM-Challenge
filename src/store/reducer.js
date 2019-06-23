import * as actionTypes from './actions'

const initialState = {
    showFooter:false,
    soundplayerPlaying:false,
    questionHintPlaying1:false,
    questionHintPlaying2:false,
    questionHintPlaying3:false,
    user:'',
    showLoaderIntroduction:false,
    userLvl:'',
    page:'/',
    userLogged:false,
    showWrongLogin:false,
    showUserExist:false,
    showSuccessRegister:false,
    showWrongLength:false
}

const reducer = ( state = initialState,action)=>{
    switch(action.type){
        case actionTypes.SHOW_FOOTER:
        return{
            ...state,
            showFooter:!state.showFooter
        }
        case actionTypes.SOUNDPLAYER_PLAYING:
            console.log(state.soundplayerPlaying)
                    return{
                        ...state,
                        soundplayerPlaying:!state.soundplayerPlaying
                    }
    
        case actionTypes.QUESTION_HINT_PLAYING1:
                console.log(action.isHintPlaying)
                
            if(typeof action.isHintPlaying==='boolean'){
               
                if(action.isHintPlaying===false){
                    console.log(action.isHintPlaying)
                    return{
                        ...state,
                        questionHintPlaying1:false,
                    }
                }else{
                    console.log(action.isHintPlaying)
                    
                    return{
                        ...state,
                        questionHintPlaying1:true,
                    }
                }
            }
            console.log(state.questionHintPlaying1)
            if(state.soundplayerPlaying){
                return {
                    ...state,
                    questionHintPlaying1:!state.questionHintPlaying1,
                    soundplayerPlaying:!state.soundplayerPlaying
                }
            }
            return {
                ...state,
                questionHintPlaying1:!state.questionHintPlaying1
            }

            case actionTypes.QUESTION_HINT_PLAYING2:
            if(typeof action.isHintPlaying==='boolean'){
                if(action.isHintPlaying===false){
                    return{
                        ...state,
                        questionHintPlaying2:false,
                    }
                }else{
                    if(state.soundplayerPlaying){
                        return{
                            ...state,
                            questionHintPlaying1:true,
                            soundplayerPlaying:!state.soundplayerPlaying
                        }
                    }
                    return{
                        ...state,
                        questionHintPlaying2:true,
                    }
                }
            }
            return {
                ...state,
                questionHintPlaying2:!state.questionHintPlaying2
            }

            case actionTypes.QUESTION_HINT_PLAYING3:
            if(typeof action.isHintPlaying==='boolean'){
                if(action.isHintPlaying===false){
                    return{
                        ...state,
                        questionHintPlaying3:false,
                    }
                }else{
                    if(state.soundplayerPlaying){
                        return{
                            ...state,
                            questionHintPlaying1:true,
                            soundplayerPlaying:!state.soundplayerPlaying
                        }
                    }
                    return{
                        ...state,
                        questionHintPlaying3:true,
                    }
                }
            }
            return {
                ...state,
                questionHintPlaying3:!state.questionHintPlaying3
            }
            case actionTypes.FETCH_ANONYMOUS_LOGIN:
                return{
                    ...state,
                    user:action.user
                }
            case actionTypes.SHOW_LOADER_INTRODUCTION:
                const { showLoaderIntroduction }=action
                return{
                    ...state,
                    showLoaderIntroduction
                }
            case actionTypes.SAVE_USER_LVL:
                return{
                    ...state,
                    userLvl:action.userLvl
                }
            case actionTypes.SAVE_PAGE_URL:
                return{
                    ...state,
                    page:action.page
                }
                case actionTypes.SAVE_USER_LOGGED:
                    return{
                        ...state,
                        userLogged:action.userLogged
                    }
                case actionTypes.SAVE_SHOW_WRONG_LOGIN:
                    return{
                        ...state,
                        showWrongLogin:action.showWrongLogin
                    }
                case actionTypes.SAVE_SHOW_USER_EXIST:
                    return{
                              ...state,
                               showUserExist:action.showUserExist
                         }
                 case actionTypes.SAVE_SHOW_WRONG_LENGTH:
                        return{
                            ...state,
                            showWrongLength:action.showWrongLength
                        }
                case actionTypes.SAVE_SHOW_SUCCESS_REGISTER:
                       return{
                           ...state,
                            showSuccessRegister:action.showSuccessRegister
                       }
                
    }
    return state
}

export default reducer;