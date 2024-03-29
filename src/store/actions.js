export const SHOW_FOOTER = 'SHOW_FOOTER';
export const SOUNDPLAYER_PLAYING = 'SOUNDPLAYER_PLAYING';
export const QUESTION_HINT_PLAYING1 = 'QUESTION_HINT_PLAYING1';
export const QUESTION_HINT_PLAYING2 = 'QUESTION_HINT_PLAYING2';
export const QUESTION_HINT_PLAYING3 = 'QUESTION_HINT_PLAYING3';
export const FETCH_ANONYMOUS_LOGIN = 'FETCH_ANONYMOUS_LOGIN';
export const SHOW_LOADER_INTRODUCTION = 'SHOW_LOADER_INTRODUCTION';
export const SAVE_USER_FROM_LOCAL_STORAGE = 'SAVE_USER_FROM_LOCAL_STORAGE';
export const SAVE_USER_LVL = 'SAVE_USER_LVL';
export const SAVE_PAGE_URL = 'SAVE_PAGE_URL';
export const SAVE_USER_LOGGED = 'SAVE_USER_LOGGED';
export const SAVE_SHOW_WRONG_LOGIN = 'SAVE_SHOW_WRONG_LOGIN';
export const SAVE_SHOW_SUCCESS_REGISTER = 'SAVE_SHOW_SUCCESS_REGISTER';
export const SAVE_SHOW_WRONG_LENGTH = 'SAVE_SHOW_WRONG_LENGTH';
export const SAVE_SHOW_USER_EXIST = 'SAVE_SHOW_USER_EXIST';
export const SAVE_CHOOSE_LVL = 'SAVE_CHOOSE_LVL';
export const RESET_LVL_DONE = 'RESET_LVL_DONE';

export const url = 'https://pure-dawn-32038.herokuapp.com/'

export const resetLvlDone = () => {
    return {
        type: RESET_LVL_DONE,
        easyLvlDone: false,
        hardLvlDone: false
    }
}
export const saveChooseLvl = (lvl) => {
    return {
        type: SAVE_CHOOSE_LVL,
        lvl
    }
}
export const saveShowUserExist = (showUserExist) => {
    return {
        type: SAVE_SHOW_USER_EXIST,
        showUserExist
    }
}
export const saveShowSuccessRegister = (showSuccessRegister) => {
    return {
        type: SAVE_SHOW_SUCCESS_REGISTER,
        showSuccessRegister
    }
}

export const saveShowWrongLength = (showWrongLength) => {
    return {
        type: SAVE_SHOW_WRONG_LENGTH,
        showWrongLength
    }
}

export const saveShowWrongLogin = (showWrongLogin) => {
    return {
        type: SAVE_SHOW_WRONG_LOGIN,
        showWrongLogin
    }
}

export const saveUserLogged = (userLogged) => {
    return {
        type: SAVE_USER_LOGGED,
        userLogged
    }
}

export const savePageUrl = (page) => {
    return {
        type: SAVE_PAGE_URL,
        page
    }
}

export const saveAnonymousLogin = (user) => {
    return {
        type: FETCH_ANONYMOUS_LOGIN,
        user,
    }
}
export const saveUserFromLocalStorage = (user) => {
    return {
        type: FETCH_ANONYMOUS_LOGIN,
        user,
    }
}
export const saveResetUsedHints = (user) => {
    return {
        type: FETCH_ANONYMOUS_LOGIN,
        user,
    }
}

export const saveUserLvl = (userLvl) => {
    return {
        type: SAVE_USER_LVL,
        userLvl
    }

}

export const showLoaderIntroduction = (showLoaderIntroduction) => {
    return {
        type: SHOW_LOADER_INTRODUCTION,
        showLoaderIntroduction
    }
}

export const fetchAnonymousLogin = () => {

    return dispatch => {
        dispatch(showLoaderIntroduction(true))
        fetch(`${url}anonymous`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    dispatch(showLoaderIntroduction(false))
                    fetch(`${url}saveLocalStorage`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: user.id
                        })
                    }).then(res => res.json())
                        .then(res => {
                            localStorage.setItem('currentUser', JSON.stringify(res))
                        })
                    dispatch(saveAnonymousLogin(user))
                }
            })
    }
}

export const fetchLocalStorage = (user, page, lvl) => {
    return dispatch => {
        setTimeout(() => {
            const storage = localStorage.getItem('currentUser')
            if (!user && storage) {
                fetch(`${url}getLocalStorage`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        hash: storage
                    })
                })
                    .then(response => response.json())
                    .then(user => {
                        const array = user.split(",");
                        const arrayToObject = {
                            id: Number(array[0]),
                            easymode: array[1],
                            hardmode: array[2],
                            username: array[3],
                            lvl: array[4],
                            easylvl: array[5],
                            usedhints: Number(array[6]),
                            failedattempts: Number(array[7]),
                            usedhintshard: Number(array[8]),
                            failedattemptshard: Number(array[9]),
                            lvlhard: Number(array[10]),

                        }
                        const userId = arrayToObject.id;
                        dispatch(saveUserFromLocalStorage(arrayToObject))
                        if (lvl === 'easy') {
                            fetch(`${url}geteasylvl/${userId}`, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(res => res.json()).then(res => {
                                dispatch(saveUserLvl(res))
                            }).catch(err => console.log(err))
                        } else if (lvl === 'hard') {
                            fetch(`${url}gethardlvl/${userId}`, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(res => res.json()).then(res => {
                                dispatch(saveUserLvl(res))
                            }).catch(err => console.log(err))
                        }

                    })
            }

        }, 300)
    }
}

export const resetUsedHints = (id, lvl) => {
    return dispatch => {
        fetch(`${url}resethints`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                lvl
            })
        }).then(res => res.json()).then(res => {
            dispatch(saveResetUsedHints(res))
        }).catch(err => console.log(err))
    }
}

export const resetFailedAttempts = (id, lvl) => {
    return dispatch => {
        fetch(`${url}resetattempts`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                lvl
            })
        }).then(res => res.json()).then(res => {
            dispatch(saveAnonymousLogin(res))
        }).catch(err => console.log(err))
    }
}

export const updateFailedAttempts = (id, lvl) => {
    return dispatch => {
        fetch(`${url}updatefailedattempts`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                lvl
            })
        }).then(res => res.json()).then(res => {
            dispatch(saveAnonymousLogin(res))
        }).catch(err => console.log(err))
    }
}

export const updateUsedHints = (id, lvl) => {
    return dispatch => {
        fetch(`${url}updatehints`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                lvl
            })
        }).then(res => res.json()).then(res => {
            dispatch(saveAnonymousLogin(res))
        }).catch(err => console.log(err))
    }
}

export const handleUserPoints = (id, lvl) => {
    return dispatch => {
        fetch(`${url}easymodePoints`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                lvl
            })
        })
            .then(response => response.json())
            .then(user => {
                dispatch(saveAnonymousLogin(user))
            })
    }
}
export const handleNextLvl = (id, lvl) => {
    if (lvl === 'easy') {
        return dispatch => {
            fetch(`${url}lvleasy`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            }).then(res => res.json()).then(res => {
                dispatch(saveAnonymousLogin(res))
            }).catch(err => console.log(err))
            setTimeout(() => {
                const userLvlNumber = parseInt(id)
                fetch(`${url}geteasylvl/${userLvlNumber}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json()).then(res => {
                    dispatch(saveUserLvl(res))
                }).catch(err => console.log(err))
            }, 2000)
        }
    } else if (lvl === 'hard') {
        return dispatch => {
            fetch(`${url}lvlhard`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            }).then(res => res.json()).then(res => {
                dispatch(saveAnonymousLogin(res))
            }).catch(err => console.log(err))


            setTimeout(() => {
                const userLvlNumber = parseInt(id)
                fetch(`${url}gethardlvl/${userLvlNumber}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json()).then(res => {
                    dispatch(saveUserLvl(res))
                }).catch(err => console.log(err))
            }, 2000)
        }
    }
}

export const resetUsers = () => {
    return dispatch => {
        const user = ''
        const userLvl = ''
        const page = '/'
        const userLogged = false
        localStorage.clear()
        dispatch(saveAnonymousLogin(user))
        dispatch(saveUserLvl(userLvl))
        dispatch(savePageUrl(page))
        dispatch(saveUserLogged(userLogged))
        dispatch(resetLvlDone())
    }
}

export const setUserLvl = (user) => {
    return dispatch => {
        dispatch(saveUserLvl(user))
    }
}

export const submitLogin = (username, password, historyPush) => {
    return dispatch => {
        if (username.trim() === '' && password.length < 6) {
            dispatch(saveShowWrongLogin(true))

            setTimeout(() => {
                dispatch(saveShowWrongLogin(false))
            }, 2000)
            return
        }
        fetch(`${url}signin`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user === 'Write proper credentials') {
                    dispatch(saveShowWrongLogin(true))

                    setTimeout(() => {
                        dispatch(saveShowWrongLogin(false))

                    }, 2000)
                    return
                }
                if (user !== 'wrong password' && user) {
                    dispatch(saveUserLogged(true))
                    dispatch(savePageUrl('introduction'))
                    dispatch(saveAnonymousLogin(user))
                    dispatch(saveShowWrongLogin(false))
                    historyPush.push('/introduction')
                    fetch(`${url}getlvl/${user.id}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json()).then(res => {
                        dispatch(saveUserLvl(res))
                    }).catch(err => console.log(err))

                    fetch(`${url}saveLocalStorage`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: user.id
                        })
                    }).then(res => res.json())
                        .then(res => {
                            localStorage.setItem('currentUser', JSON.stringify(res))
                        })
                } else {
                    dispatch(saveShowWrongLogin(true))
                    setTimeout(() => {
                        dispatch(saveShowWrongLogin(false))
                    }, 2000)
                }
            })
    }
}

export const submitRegister = (username, password) => {
    return dispatch => {
        if (username.trim() === '' && password.length < 6) {
            dispatch(saveShowWrongLength(true))
            setTimeout(() => {
                dispatch(saveShowWrongLength(false))
            }, 3000)
            return
        }
        fetch(`${url}register`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(response => response.json())
            .then(res => {
                if (res === 'success') {
                    dispatch(saveShowSuccessRegister(true))
                    setTimeout(() => {
                        dispatch(saveShowSuccessRegister(false))
                    }, 3000)
                } else if (res === 'user exist') {
                    dispatch(saveShowUserExist(true))
                    setTimeout(() => {
                        dispatch(saveShowUserExist(false))
                    }, 3000)
                } else if (res === 'Your password should be at least 6 characters') {
                    dispatch(saveShowWrongLength(true))
                    setTimeout(() => {
                        dispatch(saveShowWrongLength(false))
                    }, 3000)
                }
            })
    }
}
export const fetchUserLvl = (numberLvl, lvl) => {
    return dispatch => {
        if (lvl === 'hard') {
            return (fetch(`${url}gethardlvl/${numberLvl}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(res => {
                dispatch(setUserLvl(res))
            }).catch(err => console.log(err)))
        }
        if (lvl === 'easy') {
            return (fetch(`${url}geteasylvl/${numberLvl}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(res => {
                dispatch(setUserLvl(res))
            }).catch(err => console.log(err)))
        }
    }
}