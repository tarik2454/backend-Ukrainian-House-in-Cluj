export interface CreateEventData {
  title?: string;
  img?: string;
  description?: string;
  tags?: string[];
  date?: string;
}

import eventsData from '../db/events.json';

export interface EventItem {
  id: string;
  title: string;
  img: string;
  description: string;
  tags: string[];
  date: string;
}

export const db: EventItem[] = eventsData;
