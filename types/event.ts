export interface CreateEventData {
  title?: string;
  img?: string;
  description?: string;
  tags?: string[];
  date?: string;
}

export interface EventItem {
  id: string;
  title: string;
  img: string;
  description: string;
  tags: string[];
  date: string;
  publicationDate: string;
  eventDate: {
    date: string;
    time?: string;
    location: string;
  };
  registration: boolean;
}
