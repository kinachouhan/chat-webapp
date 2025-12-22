
export const Message = ({ text, own }) => {


    return (
        <div className="p-4">

            {
                own ?
                    (
                        <div className="flex justify-end ">
                            <h1 className="bg-blue-500 text-white p-2 rounded-sm">{text}</h1>
                        </div>

                    )
                    :
                    (
                        <div className="flex">
                            <h1 className="bg-gray-600 text-white p-2 rounded-sm">{text}</h1>
                        </div>
                    )
            }
        </div>
    )
}