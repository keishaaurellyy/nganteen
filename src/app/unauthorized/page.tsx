export default function Unauthorized() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p className="text-red-500">
        You don&apos;t have permission to access this page.
      </p>
    </div>
  );
}
