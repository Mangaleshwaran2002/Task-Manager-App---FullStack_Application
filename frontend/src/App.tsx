// import { Button } from "@/components/ui/button"
// import TaskComponent from "./components/Taskitem"
import TaskList from "./components/TaskList"
import { ThemeProvider } from "@/components/theme-provider"
import ModeToggle from '@/components/mode-toggle';
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div className="flex min-h-svh flex-col items-center p-5 dark:bg-gray-800">
      <div className="w-full flex flex-row items-center p-5 justify-between">
      <h1 className="font-semibold text-2xl sm:text-5xl  font-serif dark:text-white">Tasks</h1> 
      <ModeToggle />
      </div>
      <TaskList/>
    </div>
    </ThemeProvider>
  )
}

export default App