import { usePartSearch } from '@/hooks/usePartSearch';
import { SearchIcon, CloseIcon, AlertIcon } from '@/components/icons';
import { clearError } from '@/store/partsSlice';
import styles from './SearchForm.module.css';

export const SearchForm = () => {
  const {
    inputValue,
    setInputValue,
    handleClearInput,
    handleSelectBrand,
    manufacturers,
    loadingManufacturers,
    selectedBrand,
    error,
    dispatch,
    inputRef,
  } = usePartSearch();

  return (
    <div className="card mb-4 shadow-sm border-0">
      <div className="card-body p-4">
        <h5 className="card-title fw-bold mb-3 text-secondary">Шаг 1: Введите артикул</h5>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className={`${styles.customSearchGroup} mb-2`}>
            <span className="input-group-text text-muted">
              <SearchIcon />
            </span>

            <input
              ref={inputRef}
              type="text"
              className="form-control form-control-lg"
              placeholder="Например: 7160500039S"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              aria-label="Артикул автозапчасти"
            />

            {inputValue.length > 0 && (
              <span className={styles.btnClear} onClick={handleClearInput} title="Очистить">
                <CloseIcon />
              </span>
            )}
          </div>
        </form>

        <div className="form-text mb-3">Поиск начнется автоматически после ввода 3-х символов.</div>

        {loadingManufacturers && (
          <div className="d-flex align-items-center text-primary py-3" aria-live="polite">
            <div className="spinner-border spinner-border-sm me-2" role="status"></div>
            <span className="fw-medium">Ищем производителей...</span>
          </div>
        )}

        {error && (
          <div className="alert alert-danger d-flex align-items-center mt-3 shadow-sm" role="alert" aria-live="assertive">
            <AlertIcon className="flex-shrink-0 me-2" />
            <div className="flex-grow-1">{error}</div>
            <button type="button" className="btn-close" onClick={() => dispatch(clearError())}></button>
          </div>
        )}

        {manufacturers.length > 0 && (
          <div className="mt-4 pt-3 border-top">
            <h6 className="fw-bold mb-3">Выберите производителя:</h6>
            <div className="d-flex flex-wrap gap-2">
              {manufacturers.map((brand) => {
                const isSelected = selectedBrand === brand;
                return (
                  <button
                    key={brand}
                    className={`btn ${isSelected ? 'btn-primary' : 'btn-outline-primary'} px-4 py-2 fw-medium rounded-pill ${styles.brandBtn} ${isSelected ? styles.activeBrand : ''}`}
                    onClick={() => handleSelectBrand(brand)}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};