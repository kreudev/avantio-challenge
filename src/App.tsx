import AccommodationForm from "@/components/AccommodationForm"
import { DotsPattern } from "./components/ui/dots-pattern"
function App() {
  return (
    <main className="md:bg-muted flex items-center justify-center w-full min-h-screen overflow-hidden relative">
      <DotsPattern className="absolute inset-0 opacity-50" />
      <AccommodationForm />
    </main>
  )
}

export default App
