import React from 'react';
import styles from './ResultsTable.module.css';

export const AnalogRow = React.memo(({ analog }) => {
    return (
        <tr className={styles.tableRow}>
            <td className="ps-4 text-start">
                <div className="fw-bold text-dark fs-6 mb-1">{analog.name || 'Без названия'}</div>
                <div className="text-muted small mb-2">
                    Артикул: <span className="fw-medium text-dark">{analog.number}</span>
                </div>
                <div className="d-flex gap-2">
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">
                        {analog.brand}
                    </span>
                    {analog.notRefund && (
                        <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1" title="Невозвратная позиция">
                            Невозврат
                        </span>
                    )}
                </div>
            </td>

            <td className="text-center">
                {analog.warehouses && analog.warehouses.length > 0 ? (
                    <div className={styles.warehouseCell}>
                        <div className={styles.warehousesContainer}>
                            {analog.warehouses.map((wh, wIdx) => (
                                <div key={wIdx} className={styles.warehouseItem}>
                                    <div className={styles.warehouseBadge}>
                                        <span className={styles.warehouseName} title={`ID: ${wh.id}`}>
                                            {wh.code ? `Склад ${wh.code}` : 'Основной'}
                                        </span>
                                        <span className={styles.warehousePrice}>
                                            {Number(wh.price).toLocaleString('ru-RU')} ₽
                                        </span>
                                        <span className={styles.warehouseStock}>{wh.stock} шт.</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-3 py-2 rounded-pill">
                            Под заказ / Нет в наличии
                        </span>
                    </div>
                )}
            </td>
        </tr>
    );
});