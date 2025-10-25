
import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";
import css from "./CreateNote.module.css"

export const metadata: Metadata = {
  title: "NoteHub — Create a new note",
  description: "Create a new note in NoteHub easily and quickly.",
  openGraph: {
    title: "NoteHub — Create a new note",
    description: "Create a new note in NoteHub easily and quickly.",
    url: "http://localhost:3000/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Open Graph Image",
      },
    ],
  },
}

export default function CreateNote() {
    return (
        <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   <NoteForm></NoteForm>
  </div>
</main>
    )
    
}