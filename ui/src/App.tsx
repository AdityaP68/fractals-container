import { getEnv } from './utils/runtimeConfig';

function App() {
  const apiUrl = getEnv('API_URL');
  const featureFlag = getEnv('FEATURE_FLAG');
  const sample = getEnv('SAMPLE');

  return (
    <div>
      <h1>Runtime Environment Variables</h1>
      <p>API URL: {apiUrl || "NA"}</p>
      <p>Feature Flag: {featureFlag || "NA"}</p>
      <p>Sample: {sample || "NA"}</p>
    </div>
  );
}

export default App