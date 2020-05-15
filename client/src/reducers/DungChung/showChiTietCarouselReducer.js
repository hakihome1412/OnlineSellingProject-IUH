const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_CHITIET_CAROUSEL':
            return true;
        case 'CLOSE_CHITIET_CAROUSEL':
            return false;
        default:
            return state;
    }
}

export default noidung;