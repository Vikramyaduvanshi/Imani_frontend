import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export let fetchproducts= createAsyncThunk("products/fetchproducts", async({searchword,page}, thunkApi)=>{

    try{
let res= await axios.get("https://imaani-perfumes.onrender.com/products/all-products",{params:{productname:searchword,page}})
console.log("fetchproducts functions",res)

let ans=await res.data
return ans
// console.log("fetchproducts functions",ans)

    }catch(e){

return thunkApi.rejectWithValue(e.message)

    }
})

let initialState={
loading:false,
products:[],
err:"",
filteredProduct:[],
searchword:"",
page:1,
hashmore:true
}

let Prodcutslice= createSlice({
name:"Products",
initialState,
reducers:{
setsearch:(state,action)=>{
state.searchword=action.payload
},
clearfiltered:(state)=>{
state.filteredProduct=[]
},
setpage:(state,action)=>{
state.page = action.payload+state.page
}


},

extraReducers:(builder)=>{

builder
.addCase(fetchproducts.pending, (state, action)=>{
state.loading=true
})
.addCase (fetchproducts.fulfilled, (state, action)=>{
// console.log("action.payload",action.payload.data)
state.loading=false
if(state.searchword.length>0){
    state.filteredProduct=action.payload.data
}
else{
    for(let v of action.payload.data){
        state.products.push(v)
    }
}

if(state.products.length>=action.payload.total){
    state.hashmore=false
}


})
.addCase(fetchproducts.rejected, (state, action)=>{
    state.loading=false
state.err=action.payload
})
}
})


export default Prodcutslice.reducer;
export const {setsearch,clearfiltered,setpage}= Prodcutslice.actions