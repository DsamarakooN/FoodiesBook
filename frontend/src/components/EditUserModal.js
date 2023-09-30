import { Fragment, useReducer, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { updateProfile } from "../util/APIUtils";

export default function EditUserModal({
  open,
  setOpen,
  currentUser,
  refetchUser
}) {
  const cancelButtonRef = useRef(null);
  const [state, setState] = useReducer(
    (prevState, newState) => {
      return { ...prevState, ...newState };
    },
    {
      name: currentUser.name,
      email: currentUser.email
    }
  );

  const handleInputChange = event => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    setState({
      [inputName]: inputValue
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateProfile(currentUser.id, {
        ...currentUser,
        ...state
      });

      if (response) {
        alert("Profile updated successfully", { type: "success" });
        refetchUser();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      alert("Oops, Something went wrong", { type: "error" });
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 flex-1 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Update Profile
                      </Dialog.Title>

                      <div className="mt-2">
                        <input
                          type="text"
                          name="name"
                          onChange={handleInputChange}
                          value={state.name}
                          className="bg-gray-100 min-w-full rounded-lg p-3  border border-gray-300 outline-none"
                          spellCheck="false"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          type="email"
                          name="email"
                          onChange={handleInputChange}
                          value={state.email}
                          className="bg-gray-100 min-w-full rounded-lg p-3 border border-gray-300 outline-none"
                          spellCheck="false"
                          placeholder="Email address"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto hover:bg-red-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
