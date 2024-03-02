import SettingsPanel from "../../components/settings/settingsModal";

function Settings() {
  return (
    <div data-name="Settings">
      <SettingsPanel>
        <div className="pt-4">
          <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Your username</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">
            Your username is <strong>Blank for now</strong>
          </p>
          <button className="inline-flex text-blue-600 underline decoration-2 bg-inherit">
            Change
          </button>
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Password</p>
        <div className="flex items-center">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <label htmlFor="login-password">
              <span className="text-sm text-gray-500">Current Password</span>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="login-password"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="yousef1234"
                />
              </div>
            </label>
            <label htmlFor="login-password">
              <span className="text-sm text-gray-500">New Password</span>
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="login-password"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="yousef1234"
                />
              </div>
            </label>
          </div>
        </div>
        <p className="mt-2">
          Can't remember your password?? GG I won't create another page for that
          haha
        </p>
        <button className="mt-4 rounded-lg px-4 py-2 text-white">
          save pass
        </button>
        <hr className="mt-4 mb-8" />
      </SettingsPanel>
    </div>
  );
}

export default Settings;
