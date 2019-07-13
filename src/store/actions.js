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
        fetch('https://pure-dawn-32038.herokuapp.com/anonymous', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    console.log(user)
                    dispatch(showLoaderIntroduction(false))
                    fetch('https://pure-dawn-32038.herokuapp.com/saveLocalStorage', {
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

export const fetchLocalStorage = (user, page) => {
    console.log('aaa')
    console.log(user)
    console.log(page)
    return dispatch => {
        setTimeout(() => {
            // wywalilem warunek z page bo wczytuje sie zawsze slesz
            const storage = localStorage.getItem('currentUser')
            console.log(storage)
            if (!user && storage) {
                console.log('wykon')
                fetch('https://pure-dawn-32038.herokuapp.com/getLocalStorage', {
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
                            failedattempts: Number(array[7])
                        }
                        const userId = arrayToObject.id;
                        dispatch(saveUserFromLocalStorage(arrayToObject))
                        fetch(`https://pure-dawn-32038.herokuapp.com/getlvl/${userId}`, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(res => res.json()).then(res => {
                            dispatch(saveUserLvl(res))
                        }).catch(err => console.log(err))
                    })
            }

        }, 300)
    }
}

export const resetUsedHints = (id) => {
    return dispatch => {
        fetch('https://pure-dawn-32038.herokuapp.com/resethints', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        }).then(res => res.json()).then(res => {
            dispatch(saveResetUsedHints(res))
        }).catch(err => console.log(err))
    }
}

export const resetFailedAttempts = (id) => {
    return dispatch => {
        fetch('https://pure-dawn-32038.herokuapp.com/resetattempts', {
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
    }
}

export const updateFailedAttempts = (id) => {
    return dispatch => {
        fetch('https://pure-dawn-32038.herokuapp.com/updatefailedattempts', {
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
    }
}

export const updateUsedHints = (id) => {
    return dispatch => {
        fetch('https://pure-dawn-32038.herokuapp.com/updatehints', {
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
    }
}

export const handleUserPoints = (id) => {
    return dispatch => {
        fetch('https://pure-dawn-32038.herokuapp.com/easymodePoints', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            })
            .then(response => response.json())
            .then(user => {
                dispatch(saveAnonymousLogin(user))
            })
    }
}
export const handleNextLvl = (id) => {
    return dispatch => {
        fetch('https://pure-dawn-32038.herokuapp.com/lvl', {
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
            fetch(`https://pure-dawn-32038.herokuapp.com/getlvl/${userLvlNumber}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(res => {
                dispatch(saveUserLvl(res))
            }).catch(err => console.log(err))
        }, 2000)
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
        fetch('https://pure-dawn-32038.herokuapp.com/signin', {
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
                    fetch(`https://pure-dawn-32038.herokuapp.com/getlvl/${user.id}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json()).then(res => {
                        dispatch(saveUserLvl(res))
                    }).catch(err => console.log(err))

                    fetch('https://pure-dawn-32038.herokuapp.com/saveLocalStorage', {
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
        fetch('https://pure-dawn-32038.herokuapp.com/register', {
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
export const fetchUserLvl = (numberLvl) => {
    return dispatch => {
        fetch(`https://pure-dawn-32038.herokuapp.com/getlvl/${numberLvl}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {
            dispatch(setUserLvl(res))
        }).catch(err => console.log(err))
    }

}