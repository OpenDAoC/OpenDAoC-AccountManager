import { useSession } from "next-auth/react"

export default function UserProfile() {
    const { data: session } = useSession()

    return (
        <div className="flex-grow flex flex-col justify-center items-center">
            <>
            {session?.user.opendaoc_name && (
                <h1 className="text-xl font-bold text-center text-white mb-4">Welcome, {session.user.opendaoc_name}!</h1> // replace with check in db for discord id
            )}
                {session?.user && session.user.discord_name && (
                <span className="text-sm text-white">Discord: {session.user.discord_name}</span> 
                )}
            </>
    </div>
    );
}