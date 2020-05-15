var initState = -1;

const noidung = (state = initState, action) => {
    switch (action.type) {

        case 'SPINNER_CHITIETBANNER':
            return 8;
        case 'NO_SPINNER_CHITIETBANNER':
            return 9;
        default:
            return state;
    }
}

export default noidung;