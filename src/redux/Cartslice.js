import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * 🔥 Batch Sync API Thunk
 */
export const syncCartToDB = createAsyncThunk(
  "cart/syncCartToDB",
  async (_, { getState ,rejectWithValue}) => {
    try{
      const { pendingItems } = getState().cart;

    if (pendingItems.length === 0) return;


    let res=await axios.post(
      "https://imaani-perfumes.onrender.com/cart/add-cart",{ array:pendingItems },{ withCredentials: true}
    );
    let ds= await res.data
    console.log("response from cart api",ds)
console.log("api called after 1 in for db", pendingItems)
    return true;
    }catch(e){
return rejectWithValue(e.message)
    }
  }
  
);
export const deletecartproduct = createAsyncThunk(
  "cart/deletecartproduct",
  async (_, { getState ,rejectWithValue}) => {
    try{
      const { deleteproductfromcart } = getState().cart;

    if (deleteproductfromcart.length === 0) return;


    let res=await axios.post(
      "https://imaani-perfumes.onrender.com/cart/delete-cart",{ array:deleteproductfromcart },{ withCredentials: true}
    );
    let ds= await res.data
    console.log("response from cart api",ds)
console.log("api called after 1 in for db", deleteproductfromcart)
    return true;
    }catch(e){
return rejectWithValue(e.message)
    }
  }
  
);





const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],          // UI cart
    pendingItems: [],   // 👈 DB sync queue
    syncing: false,
    address:[],
    deleteproductfromcart:[]
  },
  reducers: {
    addToCart(state, action) {
      const { productId, quantity,price } = action.payload;

      // UI cart
      const existing = state.items.find(
        (i) => i.productId === productId
      );

      if (existing) {
        // existing.quantity += quantity;
        alert("product allready in cart")
        return
      } else {
        state.items.push({ productId, quantity,price });
      }

      // DB batch queue
      state.pendingItems.push({ productId, quantity,price });
    },

    clearPendingItems(state) {
      state.pendingItems = [];
    },
    additem:(state,action)=>{
state.items=action.payload
    },
    delefromcartslice:(state, action)=>{
  state.deleteproductfromcart.push(action.payload.productId)
  state.items.splice(action.payload.i,1)
console.log("delete from cart function",action.payload)

    },
    deleveryaddress:(state, action)=>{
state.address.push(action.payload)
    },
    Editdeleveryaddress:(state,action)=>{

state.address.push(action.payload)

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCartToDB.pending, (state) => {
        state.syncing = true;            
      })
      .addCase(syncCartToDB.fulfilled, (state) => {
        state.syncing = false;
        state.pendingItems = []; // ✅ clear after save
      })
      .addCase(syncCartToDB.rejected, (state) => {
        state.syncing = false;
      });
  },
});

export const { addToCart, clearPendingItems,additem ,delefromcartslice,deleveryaddress,Editdeleveryaddress} = cartSlice.actions;
export default cartSlice.reducer;
