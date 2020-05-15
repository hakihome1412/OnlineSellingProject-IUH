var initState = -1;

const noidung = (state = initState, action) => {
    switch (action.type) {

        case 'SPINNER_CHITIETCAROUSEL':
            return 4;
        case 'NO_SPINNER_CHITIETCAROUSEL':
            return 5;
        default:
            return state;
    }
}

export default noidung;