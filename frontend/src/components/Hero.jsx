import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] ">
      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between h-full gap-8 py-12 lg:py-0">
          {/* Hero Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[2px] bg-[#414141]"></span>
                <span className="text-sm tracking-wider text-gray-600">
                  EXCLUSIVE COLLECTION
                </span>
              </div>

              <h1 className="prata-regular text-4xl md:text-5xl lg:text-6xl text-[#414141] leading-tight">
                Elevate Your <br />
                Style Statement
              </h1>

              <p className="text-gray-600 max-w-md mt-4">
                Discover our handpicked selection of timeless pieces that blend
                sophistication with contemporary design. Each piece tells a
                story of elegance and craftsmanship.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 bg-[#414141] text-white px-8 py-3 rounded-full hover:bg-black transition-colors"
            >
              Explore Collection
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Hero Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <img
              className="w-full h-full object-cover rounded-2xl shadow-lg"
              src={assets.hero_img}
              alt="Latest Fashion Collection"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
