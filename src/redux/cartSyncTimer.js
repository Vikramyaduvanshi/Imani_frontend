import { deletecartproduct, syncCartToDB } from "./Cartslice";

let cartSyncTimer = null;

export const startCartSyncTimer = (dispatch) => {
  // Agar pehle se timer chal raha hai → reset
  if (cartSyncTimer) {
    clearTimeout(cartSyncTimer);
  }

  cartSyncTimer = setTimeout(() => {
    dispatch(syncCartToDB());
  }, 10000); // 
};

let cartdeleteTimer = null;

export const cartdelettimer = (dispatch) => {
  // Agar pehle se timer chal raha hai → reset
  if (cartSyncTimer) {
    clearTimeout(cartdeleteTimer);
  }

  cartdeleteTimer = setTimeout(() => {
    dispatch(deletecartproduct());
  }, 5000); // 
};


