"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Upload, Edit, Eye, CheckCircle } from 'lucide-react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export default function  VegetableInventoryLanding(){
  const[currentSlide, setCurrentSlide] = useState(0);
  const[isMenuOpen, setIsMenuOpen] = useState(false);

  const slides = [
    {
      image:"/image1.jpeg",
      title: 'Manage Your Harvest',
      subtitle: 'Keep track of every vegetable in your inventory'
    },
    {
      image: '/Wallpaper.jpeg',
      title: 'Stay Organized',
      subtitle: 'Never lose track of your fresh produce again'
    },
    {
      image: '/tasty.jpeg',
      title: 'Grow Smart',
      subtitle: 'Efficient inventory management for better yields'
    }
  ];

  useEffect(() => {
 const timer=setInterval(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
 }, 5000);
 return()=>clearInterval(timer);
  });

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return(
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section with Image Slider */}
      <section className="relative h-screen overflow-hidden">
  {slides.map((slide, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        index === currentSlide ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Background Image */}
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        className="object-cover"
        priority={index === 0}
        sizes="100vw"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Text Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center animate-fade-in">
          {slide.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
          {slide.subtitle}
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-2xl">
          Get Started
        </button>
      </div>
    </div>
  ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-green-800">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Three simple steps to manage your vegetable inventory
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-green-100 to-green-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-800 text-center">
                  1. Upload Tab
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  Navigate to the upload tab and fill in the form fields with your vegetable details including name, quantity, and other relevant information.
                </p>
              </div>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
                <ChevronRight className="w-8 h-8 text-green-300" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="bg-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Edit className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-800 text-center">
                  2. Submit Form
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  Once you&#39;ve filled in all the required information, submit the form to add your vegetables to the inventory system.
                </p>
              </div>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
                <ChevronRight className="w-8 h-8 text-green-300" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="group">
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-orange-800 text-center">
                  3. View & Manage
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  Go to the Items tab to view your complete inventory list. You can easily delete items when needed to keep your records up to date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

       <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <CheckCircle className="w-20 h-20 mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Keep a Vegetable Inventory?
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <p className="text-xl mb-6 leading-relaxed">
              Maintaining an accurate vegetable inventory is crucial for successful farming and distribution. It helps you track your produce, reduce waste, plan harvests effectively, and make informed decisions about planting and sales.
            </p>
            <p className="text-lg leading-relaxed">
              Don&#39;t let poor record-keeping cost you money and productivity. With our intuitive inventory system, you&#39;ll always know exactly what you have, when you have it, and when it&#39;s time to act.
            </p>
          </div>
          <button className="bg-white text-green-600 hover:bg-green-50 px-10 py-4 rounded-full text-xl font-bold transition-all transform hover:scale-105 shadow-2xl">
            Start Managing Your Inventory Today
          </button>
        </div>
      </section>
      <Footer/>
    </div>
    {/* Closing tag for the top-level <div> */}
    </div>
  );
}
