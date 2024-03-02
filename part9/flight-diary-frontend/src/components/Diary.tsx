import { DiaryEntry } from "../types"
import Entry from "./Entry";

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
  );
}

export default Diary;