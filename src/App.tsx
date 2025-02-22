import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MemoApp from './components/MemosIndex';
import './App.css';
import { MemoProvider } from './context/memoContext';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoProvider>
        <MemoApp />
      </MemoProvider>
    </QueryClientProvider>
  );
}

export default App;
