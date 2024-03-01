interface CoursePart {
  name: string,
  exerciseCount: number
}

const Header = ({ courseName } : { courseName: string}) => {
  return <h1>{courseName}</h1>
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return(
    <div>
      {
        courseParts.map(cp => (
          <p key={cp.name}>{cp.name} {cp.exerciseCount}</p>
        ))
      }
    </div>
  )
}

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return(
    <p>
      Number of exercises {totalExercises}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];


  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
