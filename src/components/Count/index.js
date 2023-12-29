import "./index.css";

const Count = ({ onPlus, onMinus, count }) => {
  return (
    <div className="flex justify-content-end align-items-center p-3">
      {"\u00A0"} {"\u00A0"}
      {count === 0 ? null : <i className="pi pi-minus" onClick={onMinus}></i>}
      {"\u00A0"}
      <span className="count">{count}</span>
      {"\u00A0"}
      <i className="pi pi-plus" onClick={onPlus}></i>
    </div>
  );
};

export default Count;
