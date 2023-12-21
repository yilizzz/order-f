import "./index.css";

const Count = ({ onPlus, onMinus, count }) => {
  return (
    <div className="order-count flex justify-content-end align-items-end">
      {count === 0 ? null : (
        <span className="minus" onClick={onMinus}>
          ----
        </span>
      )}

      <span className="count">{count}</span>
      <span className="plus" onClick={onPlus}>
        ++++
      </span>
    </div>
  );
};

export default Count;
