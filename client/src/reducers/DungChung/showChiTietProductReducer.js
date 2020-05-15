const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_CHITIET_PRODUCT':
            return true;
        case 'CLOSE_CHITIET_PRODUCT':
            return false;
        default:
            return state;
    }
}

export default noidung;