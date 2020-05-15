var initState = -1;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SPINNER_THEMCAROUSEL':
            return 2;
        case 'NO_SPINNER_THEMCAROUSEL':
            return 3;
        default:
            return state;
    }
}

export default noidung;