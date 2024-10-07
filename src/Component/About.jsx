import React from 'react'

function About() {
  return (
    <div>
       <div className="flex flex-col items-center justify-center min-h-screen bg-[#181818] text-[#F1F1F1]">
    <div className="max-w-4xl px-4 py-8">
      <h1 className="text-4xl font-bold text-[#FF4500]  mb-4">About This Project</h1>
      <p className="text-lg mb-6">
        Welcome to my movie app! This project is a personal initiative by a passionate Computer Science Engineering student
        with a goal to become a full-stack developer. I created this platform to showcase trending movies, and TV shows, 
        offering a sleek, user-friendly interface built with the latest web technologies.
      </p>
      <h2 className="text-3xl font-semibold text-[#FF4500]  mb-4">Technologies Used</h2>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>React & Vite: For blazing fast development and modern front-end capabilities.</li>
        <li>Tailwind CSS: For clean, responsive, and customizable UI components.</li>
        <li>Node.js & Express: Backend to handle API requests and serve content.</li>

      </ul>
      <h2 className="text-3xl font-semibold text-[#FF4500]  mb-4">About Me</h2>
      <p className="text-lg mb-6">
        I'm a Computer Science Engineering student with a deep interest in web development, passionate about coding, learning 
        new technologies, and bringing creative ideas to life. This app is a step towards my goal of becoming a proficient 
        developer. I love building apps that focus on great user experience and functionality, just like this movie app.
      </p>
      <h2 className="text-3xl font-semibold text-[#FF4500] mb-4">Future Plans</h2>
      <p className="text-lg">
        I plan to continuously improve this app by adding features like user authentication, personalized movie 
        recommendations, and a discussion forum where users can share their thoughts about movies and shows.
      </p>
    </div>
  </div>
    </div>
  )
}

export default About