function SpendingSummaryItem({ spending }) {
  return (
    <div className="flow-root mt-3">
        <h5 class="float-left">Bill & Utilities</h5>
        <div class="float-right">
            <p class="text-gray-900">$345.65</p>
            <p class="text-gray-900">80%</p>
        </div>
    </div>
  );
}

export default SpendingSummaryItem;