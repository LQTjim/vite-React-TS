function ItemSkeleton() {
  const arr = new Array(5).fill(1);
  return (
    <div
      role="status"
      className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      {arr.map((_, i) => (
        <div key={i} className="flex items-center justify-between">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-64 mb-2.5"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default ItemSkeleton;
