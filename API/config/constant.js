// const DbUrl = 'mongodb+srv://huymotcham:hakihome1412@cluster0-70kfe.mongodb.net/test?retryWrites=true&w=majority';

const DbUrl = 'mongodb://localhost:27017';
const DbName = 'OnlineSelling';
const soItemMoiPage = 8;
const soItemMoiPageCategory = 16;
const soItemMoiPageAdmin = 4;


module.exports = {DbUrl,DbName,soItemMoiPage,soItemMoiPageAdmin,soItemMoiPageCategory};

// Get first two documents that match the query
// .limit(2)


//hàm shuffle
// function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//     return a;
// }