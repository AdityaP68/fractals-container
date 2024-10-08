import { getEnv } from "./utils/runtimeConfig";

function App() {
  const apiUrl = getEnv("API_URL");
  const featureFlag = getEnv("FEATURE_FLAG");
  const sample = getEnv("SAMPLE");

  return (
    <div>
      <h1 className="text-3xl font-bold underline bg-red-600">Hello world!</h1>
      <h1>Runtime Environment Variables</h1>
      <p>API URL: {apiUrl || "NA"}</p>
      <p>Feature Flag: {featureFlag || "NA"}</p>
      <p>Sample: {sample || "NA"}</p>
    </div>
  );
}

export default App;
