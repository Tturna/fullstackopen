import { DiaryEntry } from "../types"

const Entry = ({ diaryEntry }: { diaryEntry: DiaryEntry }) => {
  return(
    <div>
      <h3>{diaryEntry.date}</h3>
      <p>Visibility: {diaryEntry.visibility}</p>
      <p>Weather: {diaryEntry.weather}</p>
    </div>
  );
}

export default Entry;