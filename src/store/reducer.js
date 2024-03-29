import * as actionTypes from './actions'

const initialState = {
    showFooter: false,
    soundplayerPlaying: false,
    questionHintPlaying1: false,
    questionHintPlaying2: false,
    questionHintPlaying3: false,
    user: '',
    showLoaderIntroduction: false,
    userLvl: '',
    page: '/',
    userLogged: false,
    showWrongLogin: false,
    showUserExist: false,
    showSuccessRegister: false,
    showWrongLength: false,
    gainedPointsForLvl: null,
    showGainedPointsForLvl: false,
    lvlDifficulty: '',
    easyLvlDone: false,
    hardLvlDone: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_FOOTER:
            return {
                ...state,
                showFooter: !state.showFooter
            }
        case actionTypes.SOUNDPLAYER_PLAYING:
            return {
                ...state,
                soundplayerPlaying: !state.soundplayerPlaying
            }

        case actionTypes.QUESTION_HINT_PLAYING1:

            if (typeof action.isHintPlaying === 'boolean') {

                if (action.isHintPlaying === false) {
                    return {
                        ...state,
                        questionHintPlaying1: false,
                    }
                } else {

                    return {
                        ...state,
                        questionHintPlaying1: true,
                    }
                }
            }
            if (state.soundplayerPlaying) {
                return {
                    ...state,
                    questionHintPlaying1: !state.questionHintPlaying1,
                    soundplayerPlaying: !state.soundplayerPlaying
                }
            }
            return {
                ...state,
                questionHintPlaying1: !state.questionHintPlaying1
            }

        case actionTypes.QUESTION_HINT_PLAYING2:
            if (typeof action.isHintPlaying === 'boolean') {
                if (action.isHintPlaying === false) {
                    return {
                        ...state,
                        questionHintPlaying2: false,
                    }
                } else {
                    if (state.soundplayerPlaying) {
                        return {
                            ...state,
                            questionHintPlaying1: true,
                            soundplayerPlaying: !state.soundplayerPlaying
                        }
                    }
                    return {
                        ...state,
                        questionHintPlaying2: true,
                    }
                }
            }
            if (state.soundplayerPlaying) {
                return {
                    ...state,
                    questionHintPlaying2: !state.questionHintPlaying2,
                    soundplayerPlaying: !state.soundplayerPlaying
                }
            }
            return {
                ...state,
                questionHintPlaying2: !state.questionHintPlaying2
            }

        case actionTypes.QUESTION_HINT_PLAYING3:
            if (typeof action.isHintPlaying === 'boolean') {
                if (action.isHintPlaying === false) {
                    return {
                        ...state,
                        questionHintPlaying3: false,
                    }
                } else {
                    if (state.soundplayerPlaying) {
                        return {
                            ...state,
                            questionHintPlaying1: true,
                            soundplayerPlaying: !state.soundplayerPlaying
                        }
                    }
                    return {
                        ...state,
                        questionHintPlaying3: true,
                    }
                }
            }
            if (state.soundplayerPlaying) {
                return {
                    ...state,
                    questionHintPlaying3: !state.questionHintPlaying3,
                    soundplayerPlaying: !state.soundplayerPlaying
                }
            }
            return {
                ...state,
                questionHintPlaying3: !state.questionHintPlaying3
            }
        case actionTypes.FETCH_ANONYMOUS_LOGIN:
            return {
                ...state,
                user: action.user
            }
        case actionTypes.SHOW_LOADER_INTRODUCTION:
            const {
                showLoaderIntroduction
            } = action
            return {
                ...state,
                showLoaderIntroduction
            }
        case actionTypes.SAVE_USER_LVL:
            if (action.userLvl === 'END' && state.lvlDifficulty === 'easy') {
                return {
                    ...state,
                    easyLvlDone: true
                }
            } else if (action.userLvl === 'END' && state.lvlDifficulty === 'hard') {
                return {
                    ...state,
                    hardLvlDone: true
                }
            } else {
                return {
                    ...state,
                    userLvl: action.userLvl
                }
            }

        case actionTypes.SAVE_PAGE_URL:
            return {
                ...state,
                page: action.page
            }
        case actionTypes.SAVE_USER_LOGGED:
            return {
                ...state,
                userLogged: action.userLogged
            }
        case actionTypes.SAVE_SHOW_WRONG_LOGIN:
            return {
                ...state,
                showWrongLogin: action.showWrongLogin
            }
        case actionTypes.SAVE_SHOW_USER_EXIST:
            return {
                ...state,
                showUserExist: action.showUserExist
            }
        case actionTypes.SAVE_SHOW_WRONG_LENGTH:
            return {
                ...state,
                showWrongLength: action.showWrongLength
            }
        case actionTypes.SAVE_SHOW_SUCCESS_REGISTER:
            return {
                ...state,
                showSuccessRegister: action.showSuccessRegister
            }
        case actionTypes.RESET_LVL_DONE:
            return {
                ...state,
                easyLvlDone: false,
                hardLvlDone: false
            }
        case actionTypes.SAVE_CHOOSE_LVL:
            return {
                ...state,
                lvlDifficulty: action.lvl
            }
        default: return state;
    }
}

export default reducer;