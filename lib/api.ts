import { CreateNoteRequest, Note } from "@/types/note";
import axios from "axios";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;



interface FetchNotesResponse{
    notes: Note[],
    totalPages:number
}

export type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';


export async function fetchNotes(search:string,page:number, tag?:Tag): Promise<FetchNotesResponse> {
    const response = await axios.get<FetchNotesResponse>("https://notehub-public.goit.study/api/notes", {params: {
      search: search,
      page: page,
      tag:tag,
      perPage:12
    },
      
  headers: {
    Authorization: `Bearer ${myKey}`,
  }
    })
   
    return response.data
}

export async function createNote(payload: CreateNoteRequest): Promise<Note> {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    payload,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return response.data;
}