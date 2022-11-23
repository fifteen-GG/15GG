import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './components/landing';
import { SubPage } from './components/subPage';
import { PageEnum } from './components/types/enum';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Landing />}></Route>
        <Route path="code" element={<SubPage page={PageEnum.CODE} />}></Route>
        <Route path="live" element={<SubPage page={PageEnum.LIVE} />}></Route>
        <Route path="user" element={<SubPage page={PageEnum.USER} />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
