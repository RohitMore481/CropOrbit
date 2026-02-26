export default function Login() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 p-10 rounded-2xl w-96 shadow-xl">
        <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
          Stress-Vision Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:border-green-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:border-green-500"
        />

        <button className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-lg font-semibold">
          Login
        </button>
      </div>
    </div>
  );
}