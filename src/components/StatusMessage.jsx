const StatusMessage = ({ loading, error }) => {
  if (!loading && !error) return null;
  
  return (
    <div className={`status-message ${loading ? 'loading' : 'error'}`}>
      {loading ? (
        <>
          <div className="loading-spinner"></div>
          <p>Chargement des données météo...</p>
        </>
      ) : (
        <>
          <div className="error-icon">!</div>
          <p>{error}</p>
        </>
      )}
    </div>
  );
};

export default StatusMessage; 