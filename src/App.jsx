import { Provider } from 'react-redux';
import { store } from '@/store';
import { SearchForm, ResultsTable } from '@/components';

function App() {
  return (
    <Provider store={store}>
      <div className="min-vh-100 py-5">
        <div className="container-fluid px-4 px-lg-5">
          <div className="row justify-content-center">
            <div className="col-12">

              <div className="text-center mb-5">
                <h1 className="fw-bold text-primary mb-2">Поиск автозапчастей</h1>
                <p className="text-muted">Найдите деталь по артикулу и подберите аналоги</p>
              </div>

              <SearchForm />
              <ResultsTable />

            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;