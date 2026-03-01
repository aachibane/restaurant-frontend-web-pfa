const Skeleton = () => {
  return (
    <section className="relative block py-16 bg-blueGray-200 dark:bg-gray-500">
      <div className="container mx-auto px-4">
        <div className="bg-white w-full mb-6 shadow-xl rounded-lg dark:bg-gray-300 rounded overflow-hidden shadow-lg mx-auto my-4">
          <div className="px-6 py-4">
            <div className="bg-gray-300 h-8 w-3/4 mb-2 animate-pulse"></div>
            <div className="bg-gray-300 h-4 w-1/2 mb-2 animate-pulse"></div>
            <div className="bg-gray-300 h-4 w-1/3 mb-2 animate-pulse"></div>
            <div className="bg-gray-300 h-4 w-1/4 mb-2 animate-pulse"></div>
            <div className="bg-gray-300 h-4 w-2/3 mb-2 animate-pulse"></div>
          </div>
          <div className="px-6 pt-4 pb-2">
            <div className="flex justify-between text-center">
              <div className="p-3">
                <div className="bg-gray-300 h-8 w-12 mb-1 animate-pulse"></div>
                <div className="bg-gray-300 h-4 w-16 animate-pulse"></div>
              </div>
              <div className="p-3">
                <div className="bg-gray-300 h-8 w-12 mb-1 animate-pulse"></div>
                <div className="bg-gray-300 h-4 w-16 animate-pulse"></div>
              </div>
              <div className="p-3">
                <div className="bg-gray-300 h-8 w-12 mb-1 animate-pulse"></div>
                <div className="bg-gray-300 h-4 w-24 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col break-words bg-white w-full mb-6 shadow-xl rounded-lg dark:bg-gray-300">
          <div className="py-10 border-t border-blueGray-200">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-11/12 px-4">
                <div className="bg-gray-300 h-8 w-1/4 mb-4 animate-pulse"></div>
                <div className="bg-gray-300 h-10 w-1/3 mb-4 animate-pulse"></div>
                <div className="m-6 flex items-center justify-center">
                  <div className="bg-gray-300 h-8 w-24 rounded-md px-4 py-2 mr-2 animate-pulse"></div>
                  <div className="bg-gray-300 h-8 w-32 rounded-md px-4 py-2 mr-2 animate-pulse"></div>
                  <div className="bg-gray-300 h-8 w-32 rounded-md px-4 py-2 mr-2 animate-pulse"></div>
                  <div className="bg-gray-300 h-8 w-40 rounded-md px-4 py-2 mr-2 animate-pulse"></div>
                  <div className="bg-gray-300 h-8 w-48 rounded-md px-4 py-2 ml-2 animate-pulse"></div>
                </div>
                <div className="mb-6 border rounded-lg p-4 bg-white shadow-md">
                  <div className="bg-gray-300 h-8 w-1/4 mb-2 animate-pulse"></div>
                  <ul className="list-disc ml-6">
                    <section className="text-gray-600 body-font">
                      <div className="container px-5 py-8 mx-auto">
                        <div className="flex flex-wrap -m-4">
                          <div className="lg:w-1/4 md:w-1/2 p-8 w-full relative group">
                            <div className="relative overflow-hidden bg-gray-300 h-64 w-full mb-4 animate-pulse"></div>
                            <div className="border p-5 transition duration-300 hover:shadow-xl w-full h-36 animate-pulse">
                              <div className="bg-gray-300 h-4 w-1/4 mb-2 animate-pulse"></div>
                              <div className="bg-gray-300 h-6 w-1/2 mb-2 animate-pulse"></div>
                              <div className="bg-gray-300 h-4 w-1/4 mb-2 animate-pulse"></div>
                              <div className="bg-gray-300 h-4 w-3/4 animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </ul>
                  <div className="bg-gray-300 h-10 w-1/3 mt-4 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skeleton;
