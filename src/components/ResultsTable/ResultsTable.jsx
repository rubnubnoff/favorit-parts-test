import { useSelector } from 'react-redux';
import { AnalogRow } from './AnalogRow';
import styles from './ResultsTable.module.css';

export const ResultsTable = () => {
  const { analogs, loadingAnalogs, selectedBrand } = useSelector((state) => state.parts);

  if (loadingAnalogs) {
    return (
      <div className="card text-center py-5 shadow-sm border-0">
        <div className="card-body">
          <div className="spinner-border text-success mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
          <h5 className="text-muted fw-normal">Ищем аналоги для {selectedBrand}...</h5>
        </div>
      </div>
    );
  }

  if (selectedBrand && analogs.length === 0) {
    return (
      <div className="card text-center py-4 shadow-sm border-0 animate-fade-in">
        <div className="card-body">
          <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-4 py-3 fs-5 rounded-pill mb-3">
            Аналоги для {selectedBrand} не найдены или отсутствуют на складах
          </span>
          <p className="text-muted mb-0">Попробуйте выбрать другого производителя из списка выше.</p>
        </div>
      </div>
    );
  }

  if (analogs.length === 0) return null;

  return (
    <div className="card animate-fade-in mt-4 shadow-sm border-0">
      <div className="card-header bg-dark text-white py-3 d-flex justify-content-between align-items-center" style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
        <h5 className="mb-0 fw-bold">Аналоги для {selectedBrand}</h5>
        <span className="badge bg-secondary rounded-pill px-3 py-2">Найдено: {analogs.length}</span>
      </div>

      <div className="table-responsive">
        <table className={`table align-middle mb-0 ${styles.resultsTable}`}>
          <thead className="text-muted small text-uppercase">
            <tr>
              <th className="ps-4 text-start">Деталь / Производитель</th>
              <th className="text-center" style={{ width: '40%' }}>Наличие и цены по складам</th>
            </tr>
          </thead>
          <tbody>
            {analogs.map((analog, index) => (
              <AnalogRow key={analog.goodsID || index} analog={analog} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};