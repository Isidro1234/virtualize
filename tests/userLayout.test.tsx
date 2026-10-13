import '@testing-library/jest-dom'
import {render , screen} from "@testing-library/react"
import UserVisitant from '../app/user/page'


describe("Page" , ()=>{
    it('renders a layout' , ()=>{
        render(<UserVisitant/>)
        const textElement = screen.getByText('Hello world')
        expect(textElement).toBeInTheDocument()
    })
})