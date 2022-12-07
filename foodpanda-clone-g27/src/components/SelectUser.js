import { React } from "react";
import { useNavigate } from "react-router-dom";

export function SelectUser() {
  const navigate = useNavigate();

  const rider = () => {
    navigate("/signuprider");
  };
  const customer = () => {
    navigate("/signupcust");
  };
  const restaurant = () => {
    navigate("/signuprest");
  };

  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="justify-items-center py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Select Your Account Type</h2>
          <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Register At Dastarkhwan as: a Customer, a Restaurant Owner, a Rider</p>
        </div>
        <div class="flex flex-row justify-center justify-items-center">
          <div class="space-y-8 sm:gap-6 xl:gap-10 lg:space-y-0 px-2 w-1/3">
            <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-200 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 class="mb-4 text-2xl font-semibold">Customer</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400 mb-3">Register and order food online and have it delivered wherever you want!</p>
                <button class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                  onClick={customer}>
                  Get started
                </button>
            </div>
          </div>
          <div class="space-y-8 sm:gap-6 xl:gap-10 lg:space-y-0 px-2 w-1/3">
            <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-200 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 class="mb-4 text-2xl font-semibold">Restaurant Owner</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400 mb-3">Register your restaurant to Dastarkhwan and manage your orders!</p>
                <button class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                onClick={restaurant}>>
                  Get started
                </button>
            </div>
          </div>
          <div class="space-y-8 sm:gap-6 xl:gap-10 lg:space-y-0 px-2 w-1/3">
            <div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-200 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 class="mb-4 text-2xl font-semibold">Rider</h3>
              <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400 mb-3">Register and manage your deliveries efficiently!</p>
                <button class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                onClick={rider}>
                  Get started
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
