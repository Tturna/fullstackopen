import { useState, useEffect } from "react"
import diaryService from "./services/diaryService";
import { DiaryEntry } from "./types";
import NewEntryForm from "./components/NewEntryForm";

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

  const handleAddEntryState = (addedEntry: DiaryEntry) => {
    setEntries(entries.concat(addedEntry));
  }

  if (entries.length == 0) return <div>Loading...</div>

  return (
    <div>
      <h1>Flight Diary</h1>
      <NewEntryForm addEntryState={handleAddEntryState} />
      <Diary diaryEntries={entries}/>
    </div>
  )
}

export default App
