const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'USE_QLCAROUSEL':
            return true;
        case 'DONT_USE':
            return false;
        default:
            return state;
    }
}

export default noidung;