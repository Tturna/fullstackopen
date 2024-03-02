import { useState } from "react";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "../types";
import diaryService from "../services/diaryService";
import axios from 'axios';

interface NewEntryFormProps {
  addEntryState: ((arg0: DiaryEntry) => void),
  setNotification: ((arg0: string) => void)
}

const NewEntryForm = (props: NewEntryFormProps) => {
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
      console.log('Added entry:');
      console.log(response);
      props.addEntryState(response)
      props.setNotification(`Added entry for ${response.date}`);
      setTimeout(() => {
        props.setNotification('');
      }, 5000);
    })
    .catch(error => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        props.setNotification(error.response?.data);
        setTimeout(() => {
          props.setNotification('');
        }, 5000);
      } else {
        console.log(error);
      }
    });
  }

  return(
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input type="date" value={dateInput} onChange={({ target }) => setDateInput(target.value)} />
        </div>
        <div>
          visibility
          <input id="vis1" type="radio" name="visibilityGroup" onChange={() => setVisibilityInput('great')} />
          <label>great</label>
          <input id="vis2" type="radio" name="visibilityGroup" onChange={() => setVisibilityInput('good')} />
          <label>good</label>
          <input id="vis3" type="radio" name="visibilityGroup" onChange={() => setVisibilityInput('ok')} />
          <label>ok</label>
          <input id="vis4" type="radio" name="visibilityGroup" onChange={() => setVisibilityInput('poor')} />
          <label>poor</label>
        </div>
        <div>
          weather
          <input id="wth1" type="radio" name="weatherGroup" onChange={() => setWeatherInput('sunny')} />
          <label>sunny</label>
          <input id="wth2" type="radio" name="weatherGroup" onChange={() => setWeatherInput('rainy')} />
          <label>rainy</label>
          <input id="wth3" type="radio" name="weatherGroup" onChange={() => setWeatherInput('cloudy')} />
          <label>cloudy</label>
          <input id="wth4" type="radio" name="weatherGroup" onChange={() => setWeatherInput('stormy')} />
          <label>stormy</label>
          <input id="wth5" type="radio" name="weatherGroup" onChange={() => setWeatherInput('windy')} />
          <label>windy</label>
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