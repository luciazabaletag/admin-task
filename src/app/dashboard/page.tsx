"use client"
import Task from "../components/Section/Task/Task"
import { useStore } from "../store" 
import Projects from "../components/Section/Projects/Projects"
import Clients from "../components/Section/Clients/Clients"
import Profile from "../components/Section/Profile/Profile"

export default function Page() {
  const section = useStore((state) => state.section)

  return (
        <section className="w-full">           
          {section === 'tasks' && <Task />} 
          {section === 'projects' && <Projects />}
          {section === 'clients' && <Clients />}
          {section === 'profile' && <Profile />}
        </section>
  )
}
