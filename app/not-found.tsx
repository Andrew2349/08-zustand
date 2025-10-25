import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Сторінку не знайдено — NoteHub",
  description: "На жаль, сторінки, яку ви шукаєте, не існує.",
  openGraph:{
    title:"Сторінку не знайдено — NoteHub",
    description: "404 — сторінку не знайдено",
    url: "http://localhost:3000/",
    images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Open Graph Image",
        },
      ]
  }
}


function NotFound() {
    return (
        <><h1>404 - Page not found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
        </>

    )
}
export default NotFound