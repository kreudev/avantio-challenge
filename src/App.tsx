import './App.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AccommodationForm from "@/components/AccommodationForm"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
function App() {
  return (
    <main>
      <h1>Accommodation Form</h1>
      <Button>Submit</Button>
      <Input type="text" placeholder="Enter your name" />
      <Textarea placeholder="Enter your address" />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="US">United States</SelectItem>
        </SelectContent>
      </Select>
      <AccommodationForm />
    </main>
  )
}

export default App
