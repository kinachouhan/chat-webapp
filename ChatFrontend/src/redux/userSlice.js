
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"




const initialState = {
    loading: false,
    user: null,
    error: null,
    otherUsers: [],
    selectedUser: null
}


export const fetchUser = createAsyncThunk(
    "user/fetchuser",
    async () => {
        const response = await fetch(`http://localhost:5000/api/v1/user/getprofile`, {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json()
        return data.responseData
    }
)

export const fetchOtherUser = createAsyncThunk(
    "user/fetchotheruser",
    async () => {
        const response = await fetch(`http://localhost:5000/api/v1/user/getotherusers`, {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json()
        return data.responseData
    }
)




const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },

        updateUserLastMessage: (state, action) => {
            const { userId, message, isUnread } = action.payload;

            const user = state.otherUsers.find(u => u._id === userId);
            if (user) {
                user.lastMessage = message;
                // user.unreadCount += 1;

                if (isUnread) {
                   
                    user.unreadCount = (user.unreadCount || 0) + 1;
                }

                state.otherUsers = [
                    user,
                    ...state.otherUsers.filter(u => u._id !== userId)
                ];
            }
        },



        clearUnread: (state, action) => {
            const user = state.otherUsers.find(u => u._id === action.payload);
            if (user) {
                user.unreadCount = 0;
            }
        },

       
    },


    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        builder
            .addCase(fetchOtherUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOtherUser.fulfilled, (state, action) => {
                state.loading = false;
                state.otherUsers = action.payload.map((user) => ({
                    ...user,
                    lastMessage: "",
                    unreadCount: 0

                }))
            })
            .addCase(fetchOtherUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})



export const { setSelectedUser, updateUserLastMessage , clearUnread } = userSlice.actions
export default userSlice.reducer;
