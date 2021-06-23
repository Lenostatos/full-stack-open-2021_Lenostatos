const Header = ({ text }) => <h1>{text}</h1>;

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0);
  return(
    <p style={{fontWeight: 'bold'}}>total of {sum} exercises</p>
  );
};

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>;

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part}/>)}
  </div>
);

const Course = ({ course }) => (
  <div>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;