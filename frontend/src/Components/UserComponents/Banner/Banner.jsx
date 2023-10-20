import React from "react";
import './Banner.css'
function Home() {
  return (
    <div>
      <div className="container mx-auto mt-5">
        <h1 className="text-4xl font-bold text-gray-800 mb-5">Welcome to VarLet</h1>
        <p className="text-lg text-gray-600">
          Discover amazing content and explore the best of our website. Start your journey today.
        </p>
      </div>
      <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
          <img
            src="img/skyline.jpg"
            alt="Featured Content 1"
            className="w-full h-50 object-cover"
          />
          <div className="border border-gray-300 p-2">
            <p className="text-xl font-bold text-gray-800 mb-2">Skyline</p>
          </div>
          <h3>The Nissan Skyline GT-R (Japanese: 日産・スカイラインGT-R, Hepburn: Nissan Sukairain GT-R) is a Japanese sports car based on the Nissan Skyline range. The first cars named "Skyline GT-R" were produced between 1969 and 1972 under the model code KPGC10, and were successful in Japanese touring car racing events.</h3>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
          <img
            src="img/dodge.jpg"
            alt="Featured Content 2"
            className="w-full h-50 object-cover"
          />
          <div className="border border-gray-300 p-2">
            <p className="text-xl font-bold text-gray-800 mb-2">Dodge</p>
          </div>
          <h3>Dodge is an American brand of automobiles and a division of Stellantis North America, based in Auburn Hills, Michigan. Dodge vehicles have historically included performance cars, and for much of its existence Dodge was Chrysler's mid-priced brand above Plymouth.</h3>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
          <img
            src="img/mustang.jpg"
            alt="Featured Content 3"
            className="w-full h-50 object-cover"
          />
          <div className="border border-gray-300 p-2">
            <p className="text-xl font-bold text-gray-800 mb-2">Mustang</p>
          </div>
          <h3>The namesake of the "pony car" automobile segment, the Mustang was developed as a highly styled line of sporty coupes and convertibles derived from existing model lines, initially distinguished by "long hood, short deck" proportions.</h3>
        </div>
      </div>
    </div>
  );
}

export default Home;
