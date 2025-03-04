export const Loading = () => {
    return (
        <div className="flex justify-center items-center ">
            <div className="bg-gray-300 p-1 w-2 h-2 rounded-full mx-2 animate-ping duration-500"></div>
            <div className="bg-gray-400 p-1 w-2 h-2 rounded-full mx-2 animate-ping duration-700"></div>
            <div className="bg-gray-300 p-1 w-2 h-2 rounded-full mx-2 animate-ping duration-500"></div>
        </div>
    );
};