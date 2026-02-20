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
hashmore:true,

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
if(state.filteredProduct.length>0){
state.filteredProduct= state.filteredProduct.filter((v)=> v._id !==action.payload)
}

state.products= state.products.filter((v)=> v._id !==action.payload)

},
sortprice:(state,action)=>{
if(state.filteredProduct.length>0){
if(action.payload=="High to low"){
state.filteredProduct=  state.filteredProduct.sort((a,b)=>b["price"]-a["price"])
}else{
state.filteredProduct=  state.filteredProduct.sort((a,b)=>a["price"]-b["price"])
}

}else{
if(action.payload=="High to low"){
state.products=  state.products.sort((a,b)=>b["price"]-a["price"])
}else{
state.products=  state.products.sort((a,b)=>a["price"]-b["price"])
}
}

},
sortrating:(state,action)=>{
if(state.filteredProduct.length>0){
if(action.payload=="High to low"){
state.filteredProduct=  state.filteredProduct.sort((a,b)=>b["rating"].rate-a["rating"].rate)
}else{
state.filteredProduct=  state.filteredProduct.sort((a,b)=>a["rating"].rate-b["rating"].rate)
}

}else{
if(action.payload=="High to low"){
state.products=  state.products.sort((a,b)=>b["rating"].rate-a["rating"].rate)
}else{
state.products=  state.products.sort((a,b)=>a["rating"].rate-b["rating"].rate)
}
}

},
setprcreated:(state,action)=>{
state.products.push(action.payload)

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
export const {setsearch,clearfiltered,setpage,setarr,clearsetarr,setprice,sortprice, sortrating,deleteproduct, setprcreated}= Prodcutslice.actions