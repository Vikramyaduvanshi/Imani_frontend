import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../Util/API";

export let fetchproducts= createAsyncThunk("products/fetchproducts", async({searchword,page, category, producttype,maxprice}, thunkApi)=>{

    try{
let res= await axios.get(`${api}/products/all-products`,{params:{productname:searchword,page, category:category, producttype:producttype,maxprice:maxprice }})


let ans=await res.data
console.log("fetchproducts functions",ans)
return ans


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
filterarr:[],
maxprice:5000,
hashmore:true
}

let Prodcutslice= createSlice({
name:"Products",
initialState,
reducers:{
setsearch:(state,action)=>{
state.searchword=action.payload
},
setprice:(state,action)=>{
state.maxprice=action.payload
console.log("price redux", action.payload)
},
setarr:(state, action)=>{
 if(state.filterarr.includes(action.payload)){
   state.filterarr = state.filterarr.filter(v => v !== action.payload)
 }else{
   state.filterarr.push(action.payload)
 }
 console.log("handlefilter redux",[...state.filterarr], action.payload)
},

clearfiltered:(state)=>{
state.filteredProduct=[]
},
setpage:(state,action)=>{
state.page = action.payload+state.page
},
deleteproduct:(state,action)=>{

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
if(state.searchword.length>0 || state.filterarr.length>0 || state.maxprice !==5000){
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
export const {setsearch,clearfiltered,setpage,setarr,clearsetarr,setprice}= Prodcutslice.actions