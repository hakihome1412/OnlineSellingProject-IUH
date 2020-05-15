const initState = {
    userID:null 
}

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SET_TK_DADANGNHAP':
            return ({
                userID:action.userID
            });
        default:
            return state;       
    }
}

export default noidung;