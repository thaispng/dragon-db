import './loading.css';

export function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <span className="loading-text">Carregando...</span>
    </div>
  );
}
