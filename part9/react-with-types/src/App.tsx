interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = ({ courseName } : { courseName: string}) => {
  return <h1>{courseName}</h1>
}

const Part = ({ coursePart }: {coursePart: CoursePart }) => {
  const cp = coursePart;

  switch (cp.kind) {
    case 'basic':
      return(
        <div key={cp.name}>
          <h2>{cp.name}</h2>
          <p>{cp.description}</p>
          <p>{cp.exerciseCount} exercises</p>
        </div>
      )
    case 'group':
      return(
        <div key={cp.name}>
          <h2>{cp.name}</h2>
          <p>{cp.groupProjectCount} group projects</p>
          <p>{cp.exerciseCount} exercises</p>
        </div>
      )
    case 'background':
      return(
        <div key={cp.name}>
          <h2>{cp.name}</h2>
          <p>{cp.description}</p>
          <p>Background material: {cp.backgroundMaterial}</p>
          <p>{cp.exerciseCount} exercises</p>
        </div>
      )
    case 'special':
      return(
        <div key={cp.name}>
          <h2>{cp.name}</h2>
          <p>{cp.description}</p>
          <p>requirements: {cp.requirements.join(', ')}</p>
          <p>{cp.exerciseCount} exercises</p>
        </div>
      )
    default:
      return assertNever(cp);
  }
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return(
    <div>
      {
        courseParts.map(cp => (
          <Part key={cp.name} coursePart={cp} />
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

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
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
