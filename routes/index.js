import express from "express";
import { getRoot, getUsers,getUsersByid,Register, Login, Logout, Whoami, Update } from "../controllers/Users.js";
import { getcourse, createcourse,getcourseById, updatecourse,deletecourse } from "../controllers/Course.js";
import { verifyToken  } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";


const router = express.Router();
const prefix = "/v1/api/";
//root
router.get('/', getRoot);
// router.get('/ticket', getproduct);
//auth
router.post(prefix + 'register-member', Register);//registrasi
router.post(prefix + 'login', Login);//login
router.delete(prefix +'logout', Logout);//logout

//user
router.get(prefix + 'token', refreshToken);
router.get(prefix + 'users', verifyToken, getUsers);
router.get(prefix + 'users/byid/:id', verifyToken, getUsersByid);
router.put(prefix + 'users',verifyToken,Update);
router.get(prefix + 'current-user',verifyToken, Whoami)

//course
router.get(prefix + 'course', getcourse);
router.get(prefix + 'course/:id', verifyToken, getcourseById);
router.post(prefix + 'course', verifyToken, createcourse);
router.put(prefix + 'course/:id', verifyToken, updatecourse);
router.delete(prefix + 'course/:id', verifyToken, deletecourse);

// //transaction
// router.post(prefix + 'ticket/transaction/:id', verifyToken, cereateTransaction); //membuat transaksi
// router.put(prefix + 'ticket/transaction/accept/:id',verifyToken, accept); //admin acc order
// router.put(prefix + 'ticket/transaction/reject/:id', verifyToken, reject);//admin reject order
// router.put(prefix + 'ticket/transaction/check-in/:id', verifyToken, checkIn) //checkin
// router.get(prefix + 'ticket/transaction/data', verifyToken, getTransactions)
// router.get(prefix + 'ticket/transaction/data/:id', verifyToken, getTransactionByID)

// //history
// router.get(prefix + 'ticket/transaction/data/history/member', verifyToken, memberHistory)

// //wishlist
// router.post(prefix + 'ticket/wishlist/:id', verifyToken, createWishlist)
// router.get(prefix + 'ticket/wishlist/list', verifyToken, listWishlist)
// router.delete(prefix + 'ticket/wishlist/list/:id', verifyToken, deleteWishlist)

// //notification
// router.get(prefix + 'ticket/tansactransaction/notif/menunggu' , verifyToken, NotificationIsOk)
// router.get(prefix + 'ticket/tansactransaction/notif/diterima' , verifyToken, NotificationIsAcc)
// router.get(prefix + 'ticket/tansactransaction/notif/ditolak' , verifyToken, NotificationIsReject)
export default router;