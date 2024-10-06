import { useEffect, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return <div>Time: {time}</div>;
};

function App() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch("/names.json")
      .then((response) => response.json())
      .then((data) => setNames(data));
  }, []);

  const [selectedNameDetails, setSelectedNameDetails] = useState(null);

  const onSelectedNameChange = (name) => {
    fetch(`/${name}.json`)
      .then((response) => response.json())
      .then((data) => setSelectedNameDetails(data));
  };

  return (
    <div>
      <Stopwatch />
      <div>
        {names.map((name) => (
          <button onClick={() => onSelectedNameChange(name)} key={name}>
            {name}
          </button>
        ))}
      </div>
      <div>{JSON.stringify(selectedNameDetails)}</div>
    </div>
  );
}

export default App;
