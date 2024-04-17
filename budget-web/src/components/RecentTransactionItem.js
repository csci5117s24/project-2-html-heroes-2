function RecentTransactionItem({ spending }) {
  return (
    <div className="grid grid-cols-3 divid-x w-full my-2">
        <p className="text-gray-900">{spending.category}</p>
        <p className="text-gray-900">{spending.title}</p>
        <p className="text-gray-900">{spending.price}</p>
    </div>
  );
}

export default RecentTransactionItem;