import AnimatedPage from "../Animation/AnimatedPage";

export default function Signup() {
  return (
    <AnimatedPage>
      <div
        className="relative w-full h-screen bg-gradient-to-r from-white via-blue-900 to-slate-900"
        data-name="signup"
      >
        <div className="flex justify-center items-center h-full">
          <form className="max-w-[400px] w-full mx-auto bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <h2 className="text-4xl font-bold text-center py-4 text-white hover:text-slate-600">
              Sign up
            </h2>

            <div className="flex flex-col mb-4">
              <label className="text-slate-400 hover:text-sky-400">
                Enter your first name :{" "}
              </label>
              <input
                className="border relative bg-gray-100 p-2"
                type="text"
                placeholder="username"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-slate-400 hover:text-sky-400">
                Enter your last name :{" "}
              </label>
              <input
                className="border relative bg-gray-100 p-2"
                type="text"
                placeholder="last name"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-slate-400 hover:text-sky-400">
                Create a username :{" "}
              </label>
              <input
                className="border relative bg-gray-100 p-2"
                type="text"
                placeholder="username"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-slate-400 hover:text-sky-400">
                Create your pasword :{" "}
              </label>
              <input
                className="border relative bg-gray-100 p-2"
                type="password"
                placeholder="password"
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-slate-400 hover:text-sky-400">
                Enter Your ID :{" "}
              </label>
              <input
                className="border relative bg-gray-100 p-2"
                type="password"
                placeholder="ID"
              />
            </div>
            <button className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white hover:scale-110 duration-200">
              Sign up
            </button>
            <p className='flex items-center mt-2 text-slate-400 hover:text-sky-400"'>
              <input className="mr-2 " type="checkbox" />
              Remember Me
            </p>
            <p className="text-center mt-8 text-slate-400 hover:text-sky-400">
              Already a Member? <a href="/">Just Login </a>
            </p>
          </form>
        </div>
      </div>
    </AnimatedPage>
  );
}
