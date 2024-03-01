import { useState, useEffect } from "react"
import diaryService from "./services/diaryService";

enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

interface DiaryEntry {
  id: string,
  date: string,
  weather: Weather,
  visibility: Visibility
}

const Entry = ({ diaryEntry }: { diaryEntry: DiaryEntry }) => {
  return(
    <div>
      <h3>{diaryEntry.date}</h3>
      <p>Visibility: {diaryEntry.visibility}</p>
      <p>Weather: {diaryEntry.weather}</p>
    </div>
  )
}

const Diary = ({ diaryEntries }: { diaryEntries: DiaryEntry[] }) => {
  return(
    <div>
      <h2>Diary Entries</h2>
      {
        diaryEntries.map(de => (
            <Entry key={de.id} diaryEntry={de} />
          )
        )
      }
    </div>
  )
}

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll()
    .then(response => {
      setEntries(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  if (entries.length == 0) return <div>Loading...</div>

  return (
    <div>
      <h1>Flight Diary</h1>
      <Diary diaryEntries={entries}/>
    </div>
  )
}

export default App
