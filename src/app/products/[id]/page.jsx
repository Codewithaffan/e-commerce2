"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { categoriesData } from "@/lib/categoriesData";
import { featuredProducts } from "@/lib/featuredProducts";
import { useProducts } from "@/context/ProductContext";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Categories from "../../../components/Categories";

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useProducts();

  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const productId = decodeURIComponent(rawId);

  const allProducts = [
    ...featuredProducts,
    ...Object.values(categoriesData).flat(),
  ];

  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return <p className="text-center py-20 text-gray-600">Product not found</p>;
  }

  return (
    <>
      {/* Background same as Categories */}
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="w-full border border-gray-200 rounded-md bg-white shadow-md">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-md"
              />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <p className="text-2xl text-primary-600 font-semibold mb-6">
                {product.price}
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                This premium cotton t-shirt is designed for ultimate comfort and
                style. Lightweight fabric for everyday wear.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  }
                  className="px-6 py-3 bg-yellow-500 rounded-sm text-gray-800 cursor-pointer hover:bg-yellow-600 transition"
                >
                  Add to Cart
                </button>
              </div>

              {/* Contact Details */}
              <div className="mt-8">
                <h3 className="lg:text-lg text-base font-semibold text-gray-800">
                  Contact us for more details
                </h3>
                <div className="mt-3 lg:text-sm text-xs text-gray-600 space-y-3">
                  <div className="flex gap-3 items-center">
                    <Phone size={16} />
                    <div className="flex gap-3">
                      <a href="tel:+917448135379">+91 7448135379</a>
                      <div>|</div>
                      <a href="tel:+917498881806">+91 7498881806</a>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Clock size={16} />
                    <span>Timings - 10 am to 10 pm (Operational all days)</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Mail size={16} />
                    <a href="mailto:info@theclauch.com">info@theclauch.com</a>
                  </div>
                  <div className="flex gap-3 items-center">
                    <MapPin size={16} />
                    <p>
                      Bhiwandi Dhamankar Naka Near Ammar Hotel Amina Compound
                      Clauch By Lastchoice&com 421302
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <Categories
          mainTitle="Related Products"
          mainDesc="Celebrate your favorite anime heroes and iconic scenes with bold, high-quality prints that bring your fandom to life."
          slug="anime"
          products={categoriesData.anime}
          isSlider={true}
        />
      </div>
    </>
  );
}
