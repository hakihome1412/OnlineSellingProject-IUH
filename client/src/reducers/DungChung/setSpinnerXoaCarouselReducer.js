var initState = -1;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SPINNER_XOACAROUSEL':
            return 6;
        case 'NO_SPINNER_XOACAROUSEL':
            return 7;
        default:
            return state;
    }
}

export default noidung;