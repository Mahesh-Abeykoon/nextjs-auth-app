import Link from 'next/link'
const Nav = () => {
  return (

    <header className='bg-gray-500 text-gray-200'>
        <nav className="flex justify-between items-center w-full pz-10 py-4">
            <div>My SIte</div>
            <div className='flex gap-10'>
                <Link href="/">Home</Link>
                <Link href="/CreateUser">Create User</Link>
                <Link href="/ClientMember">Client Member</Link>
                <Link href="/Member">Member</Link>
                <Link href="/Public">Public</Link>

            </div>
        </nav>
    </header>
    )
}

export default Nav