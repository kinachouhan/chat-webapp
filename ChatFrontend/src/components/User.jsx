
export const User = ({ users }) => {

    return (
        <div
            className="flex  p-2 gap-5 
  rounded-sm">
            <img className="w-[50px] h-[50px]" src={users.avatar} />
            <div>
                <h1>{users?.fullName}</h1>
                <p className="text-gray-400 text-sm">{users.lastMessage}</p>
                {users.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {users.unreadCount}
                    </span>
                )}
            </div>
        </div>
    )
}