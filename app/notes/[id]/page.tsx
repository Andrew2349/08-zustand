import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client"
import { Metadata } from "next";


type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({params}:NoteDetailsProps): Promise<Metadata>{
  const { id } = await params
  const note = await fetchNoteById(id)
  return {
    title: `NoteHub - ${note.title}`,
    description: `${note.content.slice(0, 120)}`,
    openGraph: {
      title:`NoteHub - ${note.title}`,
      description: `${note.content.slice(0, 120)}`,
      url: `http://localhost:3000/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Open Graph Image",
        },
      ],
    }
  }
}


export default async function NoteDetails({params}:NoteDetailsProps) {
    const queryClient = new QueryClient()
    const {id} = await params
    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn:()=>fetchNoteById(id)
    })
    const dehydratedState = dehydrate(queryClient);
    
    return (
        <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient></NoteDetailsClient>
    </HydrationBoundary>
    )
}