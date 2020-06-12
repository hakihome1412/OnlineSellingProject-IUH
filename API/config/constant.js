//const DbUrl = 'mongodb+srv://huymotcham:hakihome1412@cluster0-70kfe.mongodb.net/test?retryWrites=true&w=majority';

const DbUrl = 'mongodb://localhost:27017';
const DbName = 'OnlineSelling';
const soItemMoiPage = 8;
const soItemMoiPageCategory = 16;
const soItemMoiPageAdmin = 4;
const phanTramLoiNhuan = 10;

const vnp_TmnCode = '45PMXZ0H';
const vnp_HashSecret = 'CFZOAITQKICYDBRGNLGWJGNZAAGAPWLR';
const vnp_Url = 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
const vnp_ReturnUrl = 'http://sandbox.vnpayment.vn/merchant_webapi/merchant.html';

module.exports = { DbUrl, DbName, soItemMoiPage, soItemMoiPageAdmin, soItemMoiPageCategory, vnp_TmnCode, vnp_HashSecret, vnp_Url, vnp_ReturnUrl, phanTramLoiNhuan };

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