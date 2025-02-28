function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm ">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Log in</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-400 transition duration-300">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
