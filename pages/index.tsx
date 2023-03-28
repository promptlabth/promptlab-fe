import SocialMediaPostTable from '@/components/TableComponents'
import {Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'


export default function Home() {
    return (
        <div>
            <Navbar/>
            <SocialMediaPostTable/>
            <Footer/>
        </div>
    )
}
