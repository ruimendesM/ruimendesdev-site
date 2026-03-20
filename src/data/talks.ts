export interface Talk {
  title: string;
  event: string;
  date: string; // Format: "Mon YYYY"
  youtubeUrl: string;
}

export const talks: Talk[] = [
  {
    title: 'Actions for Google Assistant',
    event: 'GDG DevFest Porto',
    date: 'Nov 2019',
    youtubeUrl: 'https://www.youtube.com/watch?v=81YEf0vbxns',
  },
  {
    title: 'Databases With Room',
    event: 'GDG Porto Android Sessions',
    date: 'May 2018',
    youtubeUrl: 'https://www.youtube.com/live/tmFjgDQjelA?si=d186jBbV1yOFxFB-&t=1974',
  },
]
