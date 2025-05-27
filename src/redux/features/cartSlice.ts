import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import { RootState } from '../store'
import { IIdea } from '@/types';
import { RootState } from '../store';



interface CounterState {
  idea: IIdea[]
}


const initialState: CounterState = {
  idea: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addIdea: (state, action) => {
      const isAlreadyInCart = state.idea.find(item => item.id === action.payload.id); //checking if the idea is already in cart or not
      if(!isAlreadyInCart){
        state.idea.push(action.payload)
      }
    },
    removeIdea: (state, action) => {
      const newState = state.idea.filter(item => item.id !== action.payload);
      state.idea = newState;
    }
  },
})


export const orderedIdeaSelector = (state:RootState) => {
  return state.cart.idea;
}
export const { addIdea, removeIdea  } = cartSlice.actions


// export const selectCount = (state: RootState) => state.counter.value

export default cartSlice.reducer