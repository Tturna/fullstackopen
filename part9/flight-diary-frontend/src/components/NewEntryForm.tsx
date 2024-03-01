import { useState } from "react";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "../types";
import diaryService from "../services/diaryService";

const NewEntryForm = ({ addEntryState }: { addEntryState: ((arg0: DiaryEntry) => void)}) => {
  const [dateInput, setDateInput] = useState('');
  const [visibilityInput, setVisibilityInput] = useState('');
  const [weatherInput, setWeatherInput] = useState('');
  const [commentInput, setCommentInput] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: NewDiaryEntry = {
      date: dateInput,
      visibility: Object.values(Visibility).find(v => v.toString() === visibilityInput)!,
      weather: Object.values(Weather).find(v => v.toString() === weatherInput)!,
      comment: commentInput
    }

    diaryService.addEntry(newEntry)
    .then(response => {
        console.log(`Added entry: ${response}`);
        addEntryState(response)
    })
    .catch(error => {
      console.log(error);
    });
  }

  return(
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input value={dateInput} onChange={({ target }) => setDateInput(target.value)} />
        </div>
        <div>
          visibility
          <input value={visibilityInput} onChange={({ target }) => setVisibilityInput(target.value)} />
        </div>
        <div>
          weather
          <input value={weatherInput} onChange={({ target }) => setWeatherInput(target.value)} />
        </div>
        <div>
          comment
          <input value={commentInput} onChange={({ target }) => setCommentInput(target.value)} />
        </div>
        <button>add</button>
      </form>
    </div>
  )
}

export default NewEntryForm;