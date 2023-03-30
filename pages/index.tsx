import TableComponents from '@/components/TableComponents'
import {Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import CreateSellingPost from './feature/CreateSellingPost'


export default function Home() {
    return (
        <div>
            <Navbar/>
            <CreateSellingPost/>
            <Footer/>
        </div>
    )
}
