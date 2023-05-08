import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../consts';
import MainPage from '../../pages/main-page/main-page';
import QuestPage from '../../pages/quest-page/quest-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Quest} element={<QuestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
