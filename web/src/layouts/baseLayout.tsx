import Logo from '../assets/logo.svg';
interface BaseLayoutProps {
    children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
    return (
        <div className="h-screen w-screen p-32 bg-black text-white">
            <div>
                <img src={Logo} alt="" className='w-36 m-auto' />
            </div>
            <div className='px-20 mt-10 max-w-[800px] relative mx-auto'>
                {children}
            </div>
        </div>
    )
}