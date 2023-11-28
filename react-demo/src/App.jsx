import "./App.css";

function App() {
  const data = [
    { label: "Baseball", value: 9 },
    { label: "Basketball", value: 5 },
    { label: "Football", value: 150 },
    { label: "Soccer", value: 80 },
    { label: "Hockey", value: 99 },
  ];
  return (
    <>
      <h1>Vite + React</h1>
      <bar-chart>
        {data.map((item, i) => (
          <bar-chart-item key={i} color="lightgreen" label={item.label} value={item.value}></bar-chart-item>
        ))}
      </bar-chart>
    </>
  );
}

export default App;
