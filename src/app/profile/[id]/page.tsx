export default function UserProfilePage({params}:any){
    return(
        <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr></hr>
            <p>Profile Page</p>
            <span className="p-2 bg-orange-500 rounded-lg text-4xl text-black ">{params.id}</span>
        </div>
        </>
    )
}