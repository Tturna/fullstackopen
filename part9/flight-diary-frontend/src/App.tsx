import { useState, useEffect } from "react"
import diaryService from "./services/diaryService";
import { DiaryEntry } from "./types";
import NewEntryForm from "./components/NewEntryForm";
import Diary from "./components/Diary";
import Notification from "./components/Notification";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState('');

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
      <Notification notification={notification}/>
      <NewEntryForm addEntryState={handleAddEntryState} setNotification={setNotification} />
      <Diary diaryEntries={entries}/>
    </div>
  )
}

export default App
