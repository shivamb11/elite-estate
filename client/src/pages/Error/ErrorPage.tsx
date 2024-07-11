import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  let errorMessage: string;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <div className="flex min-h-[calc(100vh-112px)] w-full">
      <div className="w-full py-5 lg:w-3/5 lg:pr-24">
        <p className="text-center text-lg text-red-600 lg:text-left">
          {errorMessage}
        </p>
      </div>
      <div className="relative hidden w-2/5 items-center bg-orange-50 lg:flex"></div>
    </div>
  );
}

export default ErrorPage;
